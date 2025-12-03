#pragma once
#include <string>
#include <optional>

// Simple, non-SSL version.
// Production verification disabled until OpenSSL is configured.

struct TokenVerifierConfig {
    bool enable_prod_verification = false;
    std::string firebase_project_id;
};

class TokenVerifier {
public:
    TokenVerifier(const TokenVerifierConfig &cfg) : cfg_(cfg) {}

    // Reads "Authorization: Bearer <token>" header
    // Returns token string OR nullopt.
    // (Not validating token — only extracts it.)
    std::optional<std::string> extract_bearer_token(const std::string &auth_header) const;

private:
    TokenVerifierConfig cfg_;
};
