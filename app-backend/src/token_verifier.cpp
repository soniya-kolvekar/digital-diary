#include "token_verifier.h"
#include <algorithm>

// Helper to trim spaces
static std::string strip(const std::string &s) {
    size_t i = 0, j = s.size();
    while (i < j && isspace((unsigned char)s[i])) i++;
    while (j > i && isspace((unsigned char)s[j - 1])) j--;
    return s.substr(i, j - i);
}

// Extract token from header: "Authorization: Bearer <token>"
std::optional<std::string> TokenVerifier::extract_bearer_token(const std::string &auth_header) const {
    if (auth_header.size() < 7) return std::nullopt;

    // Case-insensitive check for "Bearer"
    std::string prefix = auth_header.substr(0, 6);
    for (auto &c : prefix) c = tolower(c);

    if (prefix != "bearer") return std::nullopt;

    // Extract token (everything after "Bearer ")
    std::string token = strip(auth_header.substr(6));
    if (token.empty()) return std::nullopt;

    return token;  // In dev mode, we treat token as UID directly
}
