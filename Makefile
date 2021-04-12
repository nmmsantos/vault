.PHONY: all build start watch dev clean

NODE_BIN := node_modules/.bin
CONCURRENTLY := $(NODE_BIN)/concurrently
ONCHANGE := $(NODE_BIN)/onchange
ROLLUP := $(NODE_BIN)/rollup
SERVE := $(NODE_BIN)/serve
TERSER := $(NODE_BIN)/terser -mc inline=false

$(shell mkdir -p obj/src js css fonts wasm)

all: build

build: \
	js/bundle.min.js \
	js/lzma_worker-min.js \
	js/argon2.js \
	css/bundle.min.css \
	wasm/argon2.wasm

js/bundle.min.js: \
	obj/crypto-js.min.js \
	obj/eax.min.js \
	obj/argon2.min.js \
	obj/lzma-min.js \
	obj/bulma-toast.min.js \
	obj/app.min.js
	@cat \
		obj/crypto-js.min.js \
		obj/eax.min.js \
		obj/argon2.min.js \
		obj/lzma-min.js \
		obj/bulma-toast.min.js \
		obj/app.min.js \
		>js/bundle.min.js

css/bundle.min.css: \
	obj/bulma.min.css \
	obj/animate.min.css
	@cat \
		obj/bulma.min.css \
		obj/animate.min.css \
		>css/bundle.min.css

obj/app.min.js: $(shell find src)
	@$(ROLLUP) src/index.js --format iife | $(TERSER) >obj/app.min.js

obj/crypto-js.min.js: \
	obj/crypto-js-core.min.js \
	obj/crypto-js-enc-base64.min.js \
	obj/crypto-js-md5.min.js \
	obj/crypto-js-sha1.min.js \
	obj/crypto-js-hmac.min.js \
	obj/crypto-js-evpkdf.min.js \
	obj/crypto-js-cipher-core.min.js \
	obj/crypto-js-aes.min.js \
	obj/crypto-js-x64-core.min.js \
	obj/crypto-js-sha3.min.js \
	obj/crypto-js-hmac-sha3.min.js \
	obj/crypto-js-mode-ctr.min.js
	@cat \
		obj/crypto-js-core.min.js \
		obj/crypto-js-enc-base64.min.js \
		obj/crypto-js-md5.min.js \
		obj/crypto-js-sha1.min.js \
		obj/crypto-js-hmac.min.js \
		obj/crypto-js-evpkdf.min.js \
		obj/crypto-js-cipher-core.min.js \
		obj/crypto-js-aes.min.js \
		obj/crypto-js-x64-core.min.js \
		obj/crypto-js-sha3.min.js \
		obj/crypto-js-hmac-sha3.min.js \
		obj/crypto-js-mode-ctr.min.js \
		>obj/crypto-js.min.js
	@echo "1c4bd877f12244d4e084bb1cb55b5176ffc5437843df21239c4dfb5171ac13eca2f8b31d6b8276848d51fc40a60ffd404b7d51e8f558b059a44ed3595dc0c585  obj/crypto-js.min.js" | sha512sum -c || \
		{ touch obj/crypto-js.min.js && false; }

obj/crypto-js-%.min.js:
	@curl -sSLo $@ https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/$*.min.js

obj/eax.min.js: obj/cryptojs-extension.tar.gz
	@rm -rf obj/cryptojs-extension
	@mkdir -p obj/cryptojs-extension
	@tar xvzf obj/cryptojs-extension.tar.gz -C obj/cryptojs-extension --strip-components 1
	@cd obj/cryptojs-extension && npm i && npm run build && npm run test
	@cp obj/cryptojs-extension/build/eax.min.js obj/eax.min.js

obj/cryptojs-extension.tar.gz:
	@curl -sSLo obj/cryptojs-extension.tar.gz https://github.com/artjomb/cryptojs-extension/archive/8c61d159fee7eb4828ccb409203e3b05dacfe82a.tar.gz
	@echo "2e4af7be5d5bc13be21a0a885a8bcc2b53b4066155a7e927cdac1aa46dc73e360b9bfceaed1fc18dfa64383721717f549370c47d4bc1d7a04b80f9febbbcd574  obj/cryptojs-extension.tar.gz" | sha512sum -c || \
		{ rm obj/cryptojs-extension.tar.gz && false; }

obj/argon2.min.js:
	@curl -sSLo obj/argon2.min.js https://cdn.jsdelivr.net/npm/argon2-browser@1.15.4/lib/argon2.min.js
	@echo "f1fc8bdbb7eae01d08c5445dbbaa10b9e6c0a961cf4fa73d1911ddb9414add486325c62740a3e45e729c065ee6553ea57a672a6e933b060e72902ce115a615a3  obj/argon2.min.js" | sha512sum -c || \
		{ rm obj/argon2.min.js && false; }

js/argon2.js:
	@curl -sSLo js/argon2.js https://cdn.jsdelivr.net/npm/argon2-browser@1.15.4/dist/argon2.js
	@echo "df0b215f4a1d2b07bbfdd3879bfb98ed99ab82dc89b44e4d81291e40881380b27ad4a3f877cd5d9fde474f04f81d87730da791cd5d6f48233f35da8e6fc60699  js/argon2.js" | sha512sum -c || \
		{ rm js/argon2.js && false; }

wasm/argon2.wasm:
	@curl -sSLo wasm/argon2.wasm https://cdn.jsdelivr.net/npm/argon2-browser@1.15.4/dist/argon2.wasm
	@echo "9c6f7173d0597c642ceff895451acfbe63e9e718ac8774981669560628499f3ff84b2c4901dafdcfa715e6afaca775dabd4513f0dfbc24841c7e04cb3d636ef1  wasm/argon2.wasm" | sha512sum -c || \
		{ rm wasm/argon2.wasm && false; }

obj/lzma-min.js:
	@curl -sSLo obj/lzma-min.js https://unpkg.com/lzma@2.3.2/src/lzma-min.js
	@echo "1ac2db63c75e1906fabac243ce132c1dcd80341a933ee9f01f9b20cb0827ad34d47df2ffbfc3a44eab9998a086ed13df27ea5532c516f8a137ec81dd03676f32  obj/lzma-min.js" | sha512sum -c || \
		{ rm obj/lzma-min.js && false; }

js/lzma_worker-min.js: obj/lzma_worker.js
	# unpkg.com minified version doesn't work
	@$(TERSER) -- obj/lzma_worker.js >js/lzma_worker-min.js

obj/lzma_worker.js:
	@curl -sSLo obj/lzma_worker.js https://unpkg.com/lzma@2.3.2/src/lzma_worker.js
	@echo "2297888b9bb6f3afed8de7f55bfa03eb1f5950765854343d4967be3a0d64b963db8ae9dc8c4f67da79ddc4c2fca1c4d09e079c007d3eb1334bac41e81d6bbc63  obj/lzma_worker.js" | sha512sum -c || \
		{ rm obj/lzma_worker.js && false; }

obj/bulma.min.css:
	@curl -sSLo obj/bulma.min.css https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.2/css/bulma.min.css
	@echo "6f212b41d59d4ea444cfa0cb000f690a72db7681868577d4ea09b573c6e47fb179d4956650195ac867b6037d55a575903fe7a22778a54c0647091def98ccb26c  obj/bulma.min.css" | sha512sum -c || \
		{ rm obj/bulma.min.css && false; }

obj/animate.min.css:
	@curl -sSLo obj/animate.min.css https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css
	@echo "738daa4d2c3fc0f677ff92c1cc3f81c397fb6d2176a31a2eeb011bf88fe5a9e68a57914321f32fbd1a7bef6cb88dc24b2ae1943a96c931d83f053979d1f25803  obj/animate.min.css" | sha512sum -c || \
		{ rm obj/animate.min.css && false; }

obj/bulma-toast.min.js:
	@curl -sSLo obj/bulma-toast.min.js https://unpkg.com/bulma-toast@2.3.0/dist/bulma-toast.min.js
	@echo "b07a63777554926b06627353d2596452f7c5e3b262a165ddbdfcccd6b4c9a624c251a520a6f1d740efdd1f30cc87c2fab4d47ff2989bdd78ee0e3d5791185284  obj/bulma-toast.min.js" | sha512sum -c || \
		{ rm obj/bulma-toast.min.js && false; }

start:
	@$(SERVE)

watch: build
	@$(ONCHANGE) -d 100 --await-write-finish 500 -o 'make build' 'src/**/*.js' -- sh -c 'echo {{event}} to {{changed}} >&2'

dev:
	@$(CONCURRENTLY) -k 'make start' 'make watch'

clean:
	@rm -rf obj js css fonts wasm
