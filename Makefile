.PHONY: all build start watch dev favicon clean

NODE_BIN := node_modules/.bin
CONCURRENTLY := $(NODE_BIN)/concurrently
ONCHANGE := $(NODE_BIN)/onchange
ROLLUP := $(NODE_BIN)/rollup
SERVE := $(NODE_BIN)/serve
TERSER := $(NODE_BIN)/terser -mc inline=false
REALFAVICON := $(NODE_BIN)/real-favicon

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
	obj/app.min.js
	@cat \
		obj/crypto-js.min.js \
		obj/eax.min.js \
		obj/argon2.min.js \
		obj/lzma-min.js \
		obj/app.min.js \
		>js/bundle.min.js

css/bundle.min.css: \
	obj/bulma.min.css
	@cat \
		obj/bulma.min.css \
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
	@echo "84e805d2f28c0b349f87ba21f14d4882baa2b9b85c90843a66a6bce19175c189fb66589208673c5d0b7e1ec2f8370b048ee989f896e36b94ce54188d7c6fa375  obj/crypto-js.min.js" | sha512sum -c || \
		{ touch obj/crypto-js.min.js && false; }

obj/crypto-js-%.min.js:
	@curl -sSLo $@ https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/$*.min.js

obj/eax.min.js: obj/cryptojs-extension.tar.gz
	@rm -rf obj/cryptojs-extension
	@mkdir -p obj/cryptojs-extension
	@tar xvzf obj/cryptojs-extension.tar.gz -C obj/cryptojs-extension --strip-components 1
	@cd obj/cryptojs-extension && sed -i 's/"uglify-js": ".*"/"uglify-js": "^2.8.29"/' package.json && npm i && npm run build && npm run test
	@cp obj/cryptojs-extension/build/eax.min.js obj/eax.min.js

obj/cryptojs-extension.tar.gz:
	@curl -sSLo obj/cryptojs-extension.tar.gz https://github.com/artjomb/cryptojs-extension/archive/8c61d159fee7eb4828ccb409203e3b05dacfe82a.tar.gz
	@echo "2e4af7be5d5bc13be21a0a885a8bcc2b53b4066155a7e927cdac1aa46dc73e360b9bfceaed1fc18dfa64383721717f549370c47d4bc1d7a04b80f9febbbcd574  obj/cryptojs-extension.tar.gz" | sha512sum -c || \
		{ rm obj/cryptojs-extension.tar.gz && false; }

obj/argon2.min.js:
	@curl -sSLo obj/argon2.min.js https://cdn.jsdelivr.net/npm/argon2-browser@1.18.0/lib/argon2.min.js
	@echo "09c62d89fdc0692bb1f322bf44734e734c79ef071ff4fa9a7a23d0514bac681438e352d44d9a32a93cfbd2615c92ca17970e077cfbca3a887cd19a2150107842  obj/argon2.min.js" | sha512sum -c || \
		{ rm obj/argon2.min.js && false; }

js/argon2.js:
	@curl -sSLo js/argon2.js https://cdn.jsdelivr.net/npm/argon2-browser@1.18.0/dist/argon2.js
	@echo "66e9073e16d3a83dc6b2c0158efc4fdb9cd8576fa2fc385fdf2cb135f98d8cf10d9fe32b3978180d9fe7b74957026dc33434cbacfb88127f1effde86d1f78717  js/argon2.js" | sha512sum -c || \
		{ rm js/argon2.js && false; }

wasm/argon2.wasm:
	@curl -sSLo wasm/argon2.wasm https://cdn.jsdelivr.net/npm/argon2-browser@1.18.0/dist/argon2.wasm
	@echo "510c272c03b49628adbcfc56ba0bd62f6273d89e4b0dca360170ba27c73e481a7373929b2eb83720abc43c6a6b04372fb37f817b78abf5e4e7b8b25442878696  wasm/argon2.wasm" | sha512sum -c || \
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
	@curl -sSLo obj/bulma.min.css https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css
	@echo "220983930cecf7ab784ab0a15b6f4da3735704806ff1b696e3dd33939697be1083f2fb99337c944a46f24c1717a2193249e732cc8ad4c2217fa95d1cb8f70bdd  obj/bulma.min.css" | sha512sum -c || \
		{ rm obj/bulma.min.css && false; }

start:
	$(SERVE)

watch: build
	@$(ONCHANGE) -d 100 --await-write-finish 500 -o 'make build' 'src/**/*.js' -- sh -c 'echo {{event}} to {{changed}} >&2'

dev:
	@$(CONCURRENTLY) -k 'make start' 'make watch'

favicon:
	# @$(REALFAVICON) generate faviconDescription.json faviconData.json icons
	@$(REALFAVICON) inject faviconData.json icons index.html
	@mv icons/index.html index.html

clean:
	@rm -rf obj js css fonts wasm
