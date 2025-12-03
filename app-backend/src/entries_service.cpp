#include "file_utils.h"
#include <iostream>
#include <algorithm>
#include <set>
#include <sstream>

using namespace FileUtils;
using json = nlohmann::json;

namespace EntriesService {

// --------------------------------------------------
// Ensure user folder exists
// --------------------------------------------------
inline void ensure_user(const std::string &uid) {
    fs::create_directories(fs::path("../storage") / "entries" / uid);
    fs::create_directories(fs::path("../storage") / "trash" / uid);
}

// --------------------------------------------------
// Create entry
// --------------------------------------------------
inline json create_entry(const std::string &uid, json payload, const std::string &protect_key="") {
    ensure_user(uid);

    std::string fname = make_filename_ts();
    payload["id"] = fname;

    std::string now = now_timestamp();
    payload["created_at"] = now;
    payload["updated_at"] = now;

    if(payload.value("is_protected", false) && !protect_key.empty()) {
        if(payload.contains("content")) {
            payload["content"] = xor_crypt(payload["content"].get<std::string>(), protect_key);
        }
    }

    fs::path p = fs::path("../storage") / "entries" / uid / fname;
    write_json_file(p, payload);

    return payload;
}

// --------------------------------------------------
// List entries
// --------------------------------------------------
inline std::vector<json> list_entries(const std::string &uid, bool decrypt=false, const std::string &protect_key="") {
    fs::path folder = fs::path("../storage") / "entries" / uid;

    std::vector<json> out;
    if(!fs::exists(folder)) return out;

    for(auto &p : fs::directory_iterator(folder)) {
        auto jo = read_json_file(p.path());
        if(!jo) continue;

        json j = *jo;

        if(j.value("is_protected", false) && decrypt && !protect_key.empty()) {
            if(j.contains("content"))
                j["content"] = xor_crypt(j["content"].get<std::string>(), protect_key);
        }

        out.push_back(j);
    }

    std::sort(out.begin(), out.end(), [](const json &a, const json &b){
        return a.value("created_at","") > b.value("created_at","");
    });

    return out;
}

// --------------------------------------------------
// Read a single entry
// --------------------------------------------------
inline std::optional<json> read_entry(const std::string &uid, const std::string &id, bool decrypt=false, const std::string &protect_key="") {
    fs::path p = fs::path("../storage") / "entries" / uid / id;

    if(!fs::exists(p)) return std::nullopt;

    auto jo = read_json_file(p);
    if(!jo) return std::nullopt;

    json j = *jo;

    if(j.value("is_protected", false) && decrypt && !protect_key.empty()) {
        if(j.contains("content"))
            j["content"] = xor_crypt(j["content"].get<std::string>(), protect_key);
    }

    return j;
}

// --------------------------------------------------
// Update entry
// --------------------------------------------------
inline bool update_entry(const std::string &uid, const std::string &id, json newdata, const std::string &protect_key="") {
    fs::path p = fs::path("../storage") / "entries" / uid / id;

    if(!fs::exists(p)) return false;

    auto jo = read_json_file(p);
    if(!jo) return false;

    json j = *jo;

    if(newdata.contains("title")) j["title"] = newdata["title"];

    if(newdata.contains("content")) {
        if(j.value("is_protected", false) && !protect_key.empty()) {
            j["content"] = xor_crypt(newdata["content"].get<std::string>(), protect_key);
        } else {
            j["content"] = newdata["content"];
        }
    }

    if(newdata.contains("mood")) j["mood"] = newdata["mood"];
    if(newdata.contains("tags")) j["tags"] = newdata["tags"];

    j["updated_at"] = now_timestamp();

    return write_json_file(p, j);
}

// --------------------------------------------------
// Soft delete: move entry into trash
// --------------------------------------------------
inline bool delete_entry_soft(const std::string &uid, const std::string &id) {
    fs::path src = fs::path("../storage") / "entries" / uid / id;
    if(!fs::exists(src)) return false;

    fs::path dst_dir = fs::path("../storage") / "trash" / uid;
    fs::create_directories(dst_dir);

    fs::path dst = dst_dir / id;

    fs::rename(src, dst);
    return true;
}

// --------------------------------------------------
// Flashback: entries created on the same month/day
// --------------------------------------------------
inline std::vector<json> flashback(const std::string &uid) {
    auto all = list_entries(uid);
    std::vector<json> out;

    using namespace std::chrono;
    auto now = system_clock::to_time_t(system_clock::now());

    std::tm tm{};
    #ifdef _WIN32
    localtime_s(&tm, &now);
    #else
    localtime_r(&now, &tm);
    #endif

    int mm = tm.tm_mon + 1;
    int dd = tm.tm_mday;

    for(auto &j : all) {
        std::string c = j.value("created_at", "");
        std::tm t2{};

        std::istringstream ss(c);
        ss >> std::get_time(&t2, "%a %b %d %H:%M:%S %Y");

        if(ss.fail()) continue;

        if((t2.tm_mon + 1) == mm && t2.tm_mday == dd)
            out.push_back(j);
    }

    return out;
}

// --------------------------------------------------
// Streak: consecutive days with at least 1 entry
// --------------------------------------------------
inline int streak(const std::string &uid) {
    auto all = list_entries(uid);
    std::set<std::string> dates;

    for(auto &j : all) {
        std::string c = j.value("created_at", "");
        std::tm t2{};
        std::istringstream ss(c);

        ss >> std::get_time(&t2, "%a %b %d %H:%M:%S %Y");
        if(ss.fail()) continue;

        char buf[11];
        std::strftime(buf, sizeof(buf), "%Y-%m-%d", &t2);

        dates.insert(std::string(buf));
    }

    using namespace std::chrono;
    auto today = system_clock::to_time_t(system_clock::now());

    std::tm t{};
    #ifdef _WIN32
    localtime_s(&t, &today);
    #else
    localtime_r(&t, &today);
    #endif

    int count = 0;

    for(;;) {
        char buf[11];
        std::strftime(buf, sizeof(buf), "%Y-%m-%d", &t);

        std::string s(buf);
        if(dates.count(s)) {
            count++;
            time_t tt = std::mktime(&t) - 24*60*60;

            #ifdef _WIN32
            localtime_s(&t, &tt);
            #else
            localtime_r(&t, &tt);
            #endif
        } else break;
    }

    return count;
}

} // namespace EntriesService
