#pragma once
#include <fstream>
#include <sstream>
#include <iostream>
#include <string>
#include <vector>
#include <optional>
#include <filesystem>
#include <chrono>
#include <iomanip>      

#include "json.hpp"

using json = nlohmann::json;
namespace fs = std::filesystem;

struct Entry {
    std::string id;
    std::string title;
    std::string content;
    std::string mood;
    std::vector<std::string> tags;
    bool is_protected = false;
    std::string created_at;
    std::string updated_at;
};

namespace FileUtils {

// --------------------------------------------------
// Generate readable timestamp
// --------------------------------------------------
inline std::string now_timestamp() {
    using namespace std::chrono;
    auto now = system_clock::to_time_t(system_clock::now());

    std::string s = std::ctime(&now);
    if(!s.empty() && s.back() == '\n')
        s.pop_back();

    return s;
}

// --------------------------------------------------
// Generate filename: entry_<timestamp>.json
// --------------------------------------------------
inline std::string make_filename_ts() {
    using namespace std::chrono;
    auto now = system_clock::now();
    long long ts = duration_cast<seconds>(now.time_since_epoch()).count();

    return "entry_" + std::to_string(ts) + ".json";
}

// --------------------------------------------------
// XOR encryption (simple dev-mode obfuscation)
// --------------------------------------------------
inline std::string xor_crypt(const std::string &text, const std::string &key) {
    if(key.empty()) return text;

    std::string out = text;
    for(size_t i = 0; i < out.size(); ++i)
        out[i] = out[i] ^ key[i % key.size()];

    return out;
}

// --------------------------------------------------
// Write JSON to file
// --------------------------------------------------
inline bool write_json_file(const fs::path &p, const json &j) {
    try {
        std::ofstream ofs(p, std::ios::out | std::ios::trunc);
        if(!ofs.is_open()) return false;

        ofs << j.dump(2);
        ofs.close();
        return true;
    }
    catch(...) {
        return false;
    }
}

// --------------------------------------------------
// Read JSON file (safe)
// --------------------------------------------------
inline std::optional<json> read_json_file(const fs::path &p) {
    try {
        std::ifstream ifs(p);
        if(!ifs.is_open()) return std::nullopt;

        json j;
        ifs >> j;
        ifs.close();

        return j;
    }
    catch(...) {
        return std::nullopt;
    }
}

// --------------------------------------------------
// Read all JSON files in folder
// --------------------------------------------------
inline std::vector<json> read_all_json_in_folder(const fs::path &folder) {
    std::vector<json> list;

    if(!fs::exists(folder)) return list;

    for(const auto &entry : fs::directory_iterator(folder)) {
        auto jopt = read_json_file(entry);
        if(jopt.has_value())
            list.push_back(*jopt);
    }

    return list;
}

} 
