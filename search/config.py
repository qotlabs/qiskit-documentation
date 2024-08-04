import os

# URL for accessing documentation (main application) without trailing "/":
DOCUMENTATION_HOST = os.environ.get("QISKIT_HOST", "https://example.com")

# Path to the Xapian database in the filesystem:
DATABASE_PATH = "./index"

# Allow origins for CORS:
ALLOW_ORIGINS = [
    DOCUMENTATION_HOST,
]

# Cache-Control HTTP header returned in the response:
CACHE_CONTROL = "public, max-age=86400, stale-while-revalidate=86400"
