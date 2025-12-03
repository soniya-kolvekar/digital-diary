cmake_minimum_required(VERSION 3.10)
project(diary_backend)
set(CMAKE_CXX_STANDARD 17)

include_directories(${CMAKE_SOURCE_DIR}/include)

add_executable(server src/main.cpp src/entries_service.cpp src/token_verifier.cpp)