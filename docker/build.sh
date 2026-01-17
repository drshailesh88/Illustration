#!/bin/bash
# FINNISH - Docker Build Script
# Build and optionally push Docker images

set -e

# Configuration
IMAGE_NAME="${IMAGE_NAME:-finnish}"
REGISTRY="${REGISTRY:-}"
VERSION="${VERSION:-latest}"
PLATFORMS="${PLATFORMS:-linux/amd64,linux/arm64}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
echo_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
echo_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Parse arguments
BUILD_TARGET="production"
PUSH=false
MULTI_ARCH=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --dev)
            BUILD_TARGET="development"
            shift
            ;;
        --push)
            PUSH=true
            shift
            ;;
        --multi-arch)
            MULTI_ARCH=true
            shift
            ;;
        --version)
            VERSION="$2"
            shift 2
            ;;
        --registry)
            REGISTRY="$2"
            shift 2
            ;;
        *)
            echo_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Determine full image name
if [[ -n "$REGISTRY" ]]; then
    FULL_IMAGE="${REGISTRY}/${IMAGE_NAME}"
else
    FULL_IMAGE="${IMAGE_NAME}"
fi

echo_info "Building FINNISH Docker image"
echo_info "  Image: ${FULL_IMAGE}:${VERSION}"
echo_info "  Target: ${BUILD_TARGET}"

# Change to project root
cd "$(dirname "$0")/.."

# Build image
if [[ "$MULTI_ARCH" == true ]]; then
    echo_info "Building multi-architecture image for: ${PLATFORMS}"

    # Ensure buildx is available
    if ! docker buildx version &> /dev/null; then
        echo_error "Docker buildx is required for multi-arch builds"
        exit 1
    fi

    # Create builder if not exists
    docker buildx create --name finnish-builder --use 2>/dev/null || docker buildx use finnish-builder

    BUILD_CMD="docker buildx build --platform ${PLATFORMS}"
    if [[ "$PUSH" == true ]]; then
        BUILD_CMD="${BUILD_CMD} --push"
    else
        BUILD_CMD="${BUILD_CMD} --load"
    fi
else
    BUILD_CMD="docker build"
fi

# Execute build
${BUILD_CMD} \
    --target "${BUILD_TARGET}" \
    --tag "${FULL_IMAGE}:${VERSION}" \
    --tag "${FULL_IMAGE}:latest" \
    --build-arg VITE_API_URL="${VITE_API_URL:-}" \
    --build-arg VITE_ANTHROPIC_API_KEY="${VITE_ANTHROPIC_API_KEY:-}" \
    .

echo_info "Build completed successfully!"

# Push if requested (for single-arch)
if [[ "$PUSH" == true ]] && [[ "$MULTI_ARCH" == false ]]; then
    echo_info "Pushing image to registry..."
    docker push "${FULL_IMAGE}:${VERSION}"
    docker push "${FULL_IMAGE}:latest"
    echo_info "Push completed!"
fi

# Print usage info
echo ""
echo_info "To run the container:"
echo "  docker run -p 8080:8080 ${FULL_IMAGE}:${VERSION}"
echo ""
echo_info "Or use docker-compose:"
echo "  docker-compose up finnish"
