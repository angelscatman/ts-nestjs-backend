# ts-nestjs-backend - Makefile
# Soporta agregar secciones dinámicamente sin modificar este archivo

.PHONY: help install uninstall workspaces clean clean-all
.PHONY: dev-01 dev-02 build-01 build-02 build uninstall-01 uninstall-02

help:
	@echo ""
	@echo "╔════════════════════════════════════════════════════════════╗"
	@echo "║       ts-nestjs-backend - Makefile Commands                ║"
	@echo "╚════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo ">> INSTALLATION"
	@echo "   [*] make install              Install all dependencies (monorepo)"
	@echo "   [*] make uninstall            Remove root node_modules"
	@echo ""
	@echo ">> DEVELOPMENT"
	@echo "   [*] make dev-01               Run section 01 (TypeScript + Vite)"
	@echo "   [*] make dev-02               Run section 02 (NestJS)"
	@echo ""
	@echo ">> BUILD"
	@echo "   [*] make build                Build ALL sections"
	@echo "   [*] make build-01             Build section 01 only"
	@echo "   [*] make build-02             Build section 02 only"
	@echo ""
	@echo ">> CLEANUP"
	@echo "   [*] make uninstall-01         Remove section 01 node_modules"
	@echo "   [*] make uninstall-02         Remove section 02 node_modules"
	@echo "   [*] make clean                Clean dist/ and build artifacts"
	@echo "   [*] make clean-all            Deep clean + all node_modules"
	@echo ""
	@echo ">> INFORMATION"
	@echo "   [*] make workspaces           List detected workspaces"
	@echo ""

install:
	@echo ">> Installing dependencies..."
	yarn i
	@echo -e "\n✓✓✓ Installation complete! ✓✓✓\n"

uninstall:
	@echo ">>> Removing root node_modules..."
	rm -rf node_modules
	@echo -e "\n[✓] Root uninstalled\n"

workspaces:
	@echo ">> Workspaces detected:"
	@echo ""
	yarn workspaces info

# Development targets
dev-01:
	cd sections/01-intro-typescript && yarn dev

dev-02:
	cd sections/02-car-dealership && yarn start:dev

# Build targets
build-01:
	cd sections/01-intro-typescript && yarn build

build-02:
	cd sections/02-car-dealership && yarn build

# Build all sections
build: build-01 build-02
	@echo -e "\n[✓✓✓] All sections built successfully!\n"

# Uninstall per-section
uninstall-01:
	@echo ">>> Removing section 01 node_modules..."
	rm -rf sections/01-intro-typescript/node_modules
	@echo -e "[✓] Section 01 uninstalled\n"

uninstall-02:
	@echo ">>> Removing section 02 node_modules..."
	rm -rf sections/02-car-dealership/node_modules
	@echo -e "[✓] Section 02 uninstalled\n"

# Deep clean
clean:
	@echo ">>> Cleaning dist/ and build artifacts..."
	find . -type d \( -name dist -o -name build -o -name coverage \) -exec rm -rf {} + 2>/dev/null || true
	@echo -e "[✓] Artifacts cleaned\n"

clean-all: uninstall uninstall-01 uninstall-02 clean
	@echo -e "\n╔════════════════════════════════════════╗"
	@echo "║  [✓✓✓] Complete cleanup done! [✓✓✓]    ║"
	@echo -e "╚════════════════════════════════════════╝\n"
