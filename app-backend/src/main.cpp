#include <iostream>
#include <filesystem>
#include "httplib.h"
#include "json.hpp"

#include "../include/file_utils.h"
#include "../include/token_verifier.h"
#include "entries_service.cpp"

using json = nlohmann::json;
namespace fs = std::filesystem;

int main() {

    // Correct storage outside /build/
    fs::create_directories("../storage");
    fs::create_directories("../storage/entries");
    fs::create_directories("../storage/trash");

    TokenVerifierConfig cfg;
    cfg.enable_prod_verification = false;  // DEV MODE
    TokenVerifier tokenVerifier(cfg);

    httplib::Server server;

    // -------------------------------------------------------------------
    // HEALTH CHECK
    // -------------------------------------------------------------------
    server.Get("/health", [](const httplib::Request&, httplib::Response& res){
        res.set_content(R"({"status":"ok"})", "application/json");
    });

    // -------------------------------------------------------------------
    // ADD ENTRY
    // -------------------------------------------------------------------
    server.Post("/entry/add", [&](const httplib::Request& req, httplib::Response& res){
        std::string uid;

        if(req.has_header("Authorization")) {
            auto tok = tokenVerifier.extract_bearer_token(req.get_header_value("Authorization"));
            if(tok) uid = *tok;
        }

        if(uid.empty()) uid = req.get_param_value("uid");
        if(uid.empty()) { res.status = 401; res.set_content(R"({"error":"missing uid"})", "application/json"); return; }

        try {
            json payload = json::parse(req.body);

            payload["title"] = payload.value("title", "");
            payload["content"] = payload.value("content", "");
            payload["mood"] = payload.value("mood", "neutral");
            payload["tags"] = payload.value("tags", json::array());
            payload["is_protected"] = payload.value("is_protected", false);

            std::string protect_key = "";
            if(req.has_header("X-Protect-Key"))
                protect_key = req.get_header_value("X-Protect-Key");

            auto created = EntriesService::create_entry(uid, payload, protect_key);
            res.set_content(created.dump(), "application/json");

        } catch(...) {
            res.status = 400;
            res.set_content(R"({"error":"bad json"})", "application/json");
        }
    });

    // -------------------------------------------------------------------
    // LIST ALL ENTRIES
    // -------------------------------------------------------------------
    server.Get("/entry/all", [&](const httplib::Request& req, httplib::Response& res){
        std::string uid;

        if(req.has_header("Authorization")) {
            auto tok = tokenVerifier.extract_bearer_token(req.get_header_value("Authorization"));
            if(tok) uid = *tok;
        }

        if(uid.empty()) uid = req.get_param_value("uid");
        if(uid.empty()) { res.status = 401; res.set_content(R"({"error":"missing uid"})", "application/json"); return; }

        bool decrypt = req.has_header("X-Protect-Key");
        std::string protect_key = decrypt ? req.get_header_value("X-Protect-Key") : "";

        auto list = EntriesService::list_entries(uid, decrypt, protect_key);
        res.set_content(json(list).dump(), "application/json");
    });

    // -------------------------------------------------------------------
    // FLASHBACK
    // -------------------------------------------------------------------
    server.Get("/entry/flashback", [&](const httplib::Request& req, httplib::Response& res){
        std::string uid;

        if(req.has_header("Authorization")) {
            auto tok = tokenVerifier.extract_bearer_token(req.get_header_value("Authorization"));
            if(tok) uid = *tok;
        }

        if(uid.empty()) uid = req.get_param_value("uid");
        if(uid.empty()) {
            res.status = 401;
            res.set_content(R"({"error":"missing uid"})", "application/json");
            return;
        }

        auto arr = EntriesService::flashback(uid);
        res.set_content(json(arr).dump(), "application/json");
    });

    // -------------------------------------------------------------------
    // STREAK
    // -------------------------------------------------------------------
    server.Get("/entry/streak", [&](const httplib::Request& req, httplib::Response& res){
        std::string uid;

        if(req.has_header("Authorization")) {
            auto tok = tokenVerifier.extract_bearer_token(req.get_header_value("Authorization"));
            if(tok) uid = *tok;
        }

        if(uid.empty()) uid = req.get_param_value("uid");
        if(uid.empty()) {
            res.status = 401;
            res.set_content(R"({"error":"missing uid"})", "application/json");
            return;
        }

        int s = EntriesService::streak(uid);
        json out; out["streak"] = s;
        res.set_content(out.dump(), "application/json");
    });

    // -------------------------------------------------------------------
    // UPDATE ENTRY
    // -------------------------------------------------------------------
    server.Put("/entry/update", [&](const httplib::Request& req, httplib::Response& res){
        std::string uid;

        if(req.has_header("Authorization")) {
            auto tok = tokenVerifier.extract_bearer_token(req.get_header_value("Authorization"));
            if(tok) uid = *tok;
        }

        if(uid.empty()) uid = req.get_param_value("uid");
        if(uid.empty()) { res.status = 401; res.set_content(R"({"error":"missing uid"})", "application/json"); return; }

        try {
            json payload = json::parse(req.body);
            std::string id = payload.value("id", "");

            if(id.empty()) {
                res.status = 400;
                res.set_content(R"({"error":"missing id"})","application/json");
                return;
            }

            std::string protect_key = "";
            if(req.has_header("X-Protect-Key"))
                protect_key = req.get_header_value("X-Protect-Key");

            bool ok = EntriesService::update_entry(uid, id, payload, protect_key);
            if(!ok) { res.status = 404; res.set_content(R"({"error":"not found"})","application/json"); return; }

            res.set_content(R"({"status":"ok"})","application/json");
        }
        catch(...) {
            res.status = 400;
            res.set_content(R"({"error":"bad json"})","application/json");
        }
    });

    // -------------------------------------------------------------------
    // DELETE ENTRY
    // -------------------------------------------------------------------
    server.Delete("/entry/delete", [&](const httplib::Request& req, httplib::Response& res){
        std::string uid;

        if(req.has_header("Authorization")) {
            auto tok = tokenVerifier.extract_bearer_token(req.get_header_value("Authorization"));
            if(tok) uid = *tok;
        }

        if(uid.empty()) uid = req.get_param_value("uid");
        if(uid.empty()) { res.status = 401; res.set_content(R"({"error":"missing uid"})","application/json"); return; }

        std::string id = req.get_param_value("id");
        if(id.empty()) { res.status = 400; res.set_content(R"({"error":"missing id"})","application/json"); return; }

        bool ok = EntriesService::delete_entry_soft(uid, id);
        if(!ok) { res.status = 404; res.set_content(R"({"error":"not found"})","application/json"); return; }

        res.set_content(R"({"status":"ok"})","application/json");
    });

    // -------------------------------------------------------------------
    // READ SINGLE ENTRY (moved to bottom + renamed)
    // -------------------------------------------------------------------
    server.Get(R"(/entry/item/([\w\-_\.]+))", [&](const httplib::Request& req, httplib::Response& res){
        std::string id = req.matches[1];
        std::string uid;

        if(req.has_header("Authorization")) {
            auto tok = tokenVerifier.extract_bearer_token(req.get_header_value("Authorization"));
            if(tok) uid = *tok;
        }

        if(uid.empty()) uid = req.get_param_value("uid");
        if(uid.empty()) { res.status = 401; res.set_content(R"({"error":"missing uid"})", "application/json"); return; }

        bool decrypt = req.has_header("X-Protect-Key");
        std::string protect_key = decrypt ? req.get_header_value("X-Protect-Key") : "";

        auto entry = EntriesService::read_entry(uid, id, decrypt, protect_key);
        if(!entry) { res.status = 404; res.set_content(R"({"error":"not found"})","application/json"); return; }

        res.set_content(entry->dump(), "application/json");
    });

    // -------------------------------------------------------------------
    std::cout << "Backend running at http://localhost:8080\n";
    server.listen("0.0.0.0", 8080);
}
