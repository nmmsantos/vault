.PHONY: all build start watch dev clean

NODE_BIN := node_modules/.bin
CONCURRENTLY := $(NODE_BIN)/concurrently
ONCHANGE := $(NODE_BIN)/onchange
ROLLUP := $(NODE_BIN)/rollup
SERVE := $(NODE_BIN)/serve
UGLIFYJS := $(NODE_BIN)/uglifyjs -mc inline=false

$(shell mkdir -p obj/src js css fonts wasm)

all: build

build: \
	js/bundle.min.js \
	js/lzma_worker-min.js \
	js/argon2.js \
	css/bundle.min.css \
	fonts/ionicons.eot \
	fonts/ionicons.woff2 \
	fonts/ionicons.woff \
	fonts/ionicons.ttf \
	fonts/ionicons.svg \
	wasm/argon2.wasm

js/bundle.min.js: \
	obj/onsenui.min.js \
	obj/underscore-min.min.js \
	obj/clipboard.min.js \
	obj/jsrsasign-all-min.min.js \
	obj/mode-ctr-min.js \
	obj/sha3-min.js \
	obj/eax.min.js \
	obj/argon2.min.js \
	obj/lzma-min.js \
	obj/codeflask.min.js \
	obj/prism-yaml.min.js \
	obj/js-yaml.min.js \
	obj/gapi.js \
	obj/app.min.js
	@cat \
		obj/onsenui.min.js \
		obj/underscore-min.min.js \
		obj/clipboard.min.js \
		obj/jsrsasign-all-min.min.js \
		obj/mode-ctr-min.js \
		obj/sha3-min.js \
		obj/eax.min.js \
		obj/argon2.min.js \
		obj/lzma-min.js \
		obj/codeflask.min.js \
		obj/prism-yaml.min.js \
		obj/js-yaml.min.js \
		obj/gapi.js \
		obj/app.min.js \
		>js/bundle.min.js

css/bundle.min.css: \
	obj/ionicons.min.css \
	obj/onsenui-core.min.css \
	obj/onsen-css-components.min.css
	@cat \
		obj/ionicons.min.css \
		obj/onsenui-core.min.css \
		obj/onsen-css-components.min.css \
		>css/bundle.min.css

obj/app.min.js: $(shell find src)
	@$(ROLLUP) src/index.js --format iife | $(UGLIFYJS) >obj/app.min.js

obj/onsenui.min.js:
	@curl -sSLo obj/onsenui.min.js https://cdnjs.cloudflare.com/ajax/libs/onsen/2.10.10/js/onsenui.min.js
	@echo "dbb20cfe6a12dd57723cff6ba4963f998ee75bf842e3fe84fdb4b9678a988aea38a2c9f14402ab2b1f3d67c6ceae570d466fa856adb88a0e8f9a9caa2cda5052  obj/onsenui.min.js" | sha512sum -c || \
		{ rm obj/onsenui.min.js && false; }

obj/ionicons.min.css:
	@curl -sSLo obj/ionicons.min.css https://cdnjs.cloudflare.com/ajax/libs/onsen/2.10.10/css/ionicons/css/ionicons.min.css
	@echo "d37d928f2bd71f2b71deaf7b9ee678bfa58b69ccb7cd9b7e916c27f90961524e941e2620dd7e1368f86f0dbf522000341c1039363a52ab880c9f4f920e3f9a50  obj/ionicons.min.css" | sha512sum -c || \
		{ rm obj/ionicons.min.css && false; }

fonts/ionicons.eot:
	@curl -sSLo fonts/ionicons.eot https://cdnjs.cloudflare.com/ajax/libs/onsen/2.10.10/css/ionicons/fonts/ionicons.eot
	@echo "d364e033bac8653d6316d5255797fd7b9334af5858b6343a23eea5ccabf96f3b5545a8625b6c951e9cb64855890385a04b964d5f1724b6dd8fd45da38277b66d  fonts/ionicons.eot" | sha512sum -c || \
		{ rm fonts/ionicons.eot && false; }

fonts/ionicons.woff2:
	@curl -sSLo fonts/ionicons.woff2 https://cdnjs.cloudflare.com/ajax/libs/onsen/2.10.10/css/ionicons/fonts/ionicons.woff2
	@echo "f237649aa00c321dad0e6569c525c7eeeba3ca0b0da27e6a11c6a3fd7d8488dd70143764aab810b90fc30555b72395ef1ab96a196cb3c40598d7817d51d21fd9  fonts/ionicons.woff2" | sha512sum -c || \
		{ rm fonts/ionicons.woff2 && false; }

fonts/ionicons.woff:
	@curl -sSLo fonts/ionicons.woff https://cdnjs.cloudflare.com/ajax/libs/onsen/2.10.10/css/ionicons/fonts/ionicons.woff
	@echo "63c635202145a18ae7826a5808430007c8638da6c16cf09ab942b0538414111840e64ffc7edc372b7d016fc2e6bdf6db083c61b203761ac7e7cff69b516618bf  fonts/ionicons.woff" | sha512sum -c || \
		{ rm fonts/ionicons.woff && false; }

fonts/ionicons.ttf:
	@curl -sSLo fonts/ionicons.ttf https://cdnjs.cloudflare.com/ajax/libs/onsen/2.10.10/css/ionicons/fonts/ionicons.ttf
	@echo "28c76d24e86ef94f95946961cc99159ffdd7fe456f4a5dbadeaea304620d5492072aa37a19d11605fe410ef17a100bc812e6f98459d1b2747c32e8fb362a767d  fonts/ionicons.ttf" | sha512sum -c || \
		{ rm fonts/ionicons.ttf && false; }

fonts/ionicons.svg:
	@curl -sSLo fonts/ionicons.svg https://cdnjs.cloudflare.com/ajax/libs/onsen/2.10.10/css/ionicons/fonts/ionicons.svg
	@echo "c9f6c41f69ad354d0f9cf43d3bc5bbe90b334e48b17da4e4f4f58a584bd1b7793f4c1946869bd0ae68e924c1e6be5880717ec9a4544ff87c342575f652446c28  fonts/ionicons.svg" | sha512sum -c || \
		{ rm fonts/ionicons.svg && false; }

obj/onsenui-core.min.css:
	@curl -sSLo obj/onsenui-core.min.css https://cdnjs.cloudflare.com/ajax/libs/onsen/2.10.10/css/onsenui-core.min.css
	@echo "d1c74f58ba07ef76e2aaa59e809b9e0f80741fc23f0894e39e12b5546a3a4e6ddfcbb8dfe81735733ac9bd7b9597faf0d0824d7bfeb5f6c6a09a26f966da02c1  obj/onsenui-core.min.css" | sha512sum -c || \
		{ rm obj/onsenui-core.min.css && false; }

obj/onsen-css-components.min.css:
	@curl -sSLo obj/onsen-css-components.min.css https://cdnjs.cloudflare.com/ajax/libs/onsen/2.10.10/css/onsen-css-components.min.css
	@echo "7b6de29a24df69c34bd9b079c1529e31b8337447ad12beb577210a01af330a4b89ced5b0776be65fcee4daf3b26d022ec58cea741e192fa222ea9d99fde60fdd  obj/onsen-css-components.min.css" | sha512sum -c || \
		{ obj/onsen-css-components.min.css && false; }

obj/underscore-min.min.js:
	@curl -sSLo obj/underscore-min.min.js https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.10.2/underscore-min.min.js
	@echo "3683f9743215ebdf19cc315044e6d717400f67e81dd23cd0c24b8591408206ddae7b1b28b7481b74ed6c10bca8d8ebcc2d105c9b21b72dcc525fc56261567207  obj/underscore-min.min.js" | sha512sum -c || \
		{ rm obj/underscore-min.min.js && false; }

obj/clipboard.min.js:
	@curl -sSLo obj/clipboard.min.js https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.6/clipboard.min.js
	@echo "843586ca1f88cb832bf401cecd43f6f98d2254f9ff070c716a84a57848c7fe2d68e0455317fb21d3f0354b28a2f0f58e69efae3ebf93fca1f0ca7a1e6d2b8087  obj/clipboard.min.js" | sha512sum -c || \
		{ rm obj/clipboard.min.js && false; }

obj/jsrsasign-all-min.min.js:
	# includes CryptoJS v3.1.2
	@curl -sSLo obj/jsrsasign-all-min.min.js https://cdnjs.cloudflare.com/ajax/libs/jsrsasign/8.0.21/jsrsasign-all-min.min.js
	@echo "7924f7a8cbee8d8234b6e0683ee6d28f15588d660429f6a54bb01595c2e970ee27fe21b516dee9140046e40cc8255ede8db67090fbc58a3bfb2b13ad18728107  obj/jsrsasign-all-min.min.js" | sha512sum -c || \
		{ rm obj/jsrsasign-all-min.min.js && false; }

obj/mode-ctr-min.js:
	@curl -sSLo obj/mode-ctr-min.js https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/mode-ctr-min.js
	@echo "81ae0e7e45bfd2459fc81a64afb7ae781566964c9e35b7828d670d7dda3b9f20b4a7d3b3776794d43dbbe0ad9522e0c3f53d3e3b9f3ef3e27258a299a3daee69  obj/mode-ctr-min.js" | sha512sum -c || \
		{ rm obj/mode-ctr-min.js && false; }

obj/sha3-min.js:
	@curl -sSLo obj/sha3-min.js https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/sha3-min.js
	@echo "02f8b7b6f523d4381c6702ad297d2ade5f9d3bbc3a2ed68c0f200156f190c9378670915ebdf2760920848cb51586568e08492388fe86062897b7d20266b70253  obj/sha3-min.js" | sha512sum -c || \
		{ rm obj/sha3-min.js && false; }

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
	@curl -sSLo obj/argon2.min.js https://cdn.jsdelivr.net/npm/argon2-browser@1.13.0/lib/argon2.min.js
	@echo "b6628369654534aed444ca572d320708de72e44852855955a5dc26287bd05c9095831fbb87038e56204fd7288d7ad459ec9e1fad37b309bfc20d4277391c8c33  obj/argon2.min.js" | sha512sum -c || \
		{ rm obj/argon2.min.js && false; }

js/argon2.js:
	@curl -sSLo js/argon2.js https://cdn.jsdelivr.net/npm/argon2-browser@1.13.0/dist/argon2.js
	@echo "0d48c129ba5acad847c8745f7ae48254258d28150fc8dec2f420c2c02a5a5a94b3f353101489e61f50918adab036638f2c047a3e9bdc1493363c32c34c45703f  js/argon2.js" | sha512sum -c || \
		{ rm js/argon2.js && false; }

wasm/argon2.wasm:
	@curl -sSLo wasm/argon2.wasm https://cdn.jsdelivr.net/npm/argon2-browser@1.13.0/dist/argon2.wasm
	@echo "f6ba0a93c080e7c4809e00da47891cce20df54f80ff2e3f13593d035180753c20077b366e936ba2fde17ab759e712c34e478a825292db478923eeb293c63922d  wasm/argon2.wasm" | sha512sum -c || \
		{ rm wasm/argon2.wasm && false; }

obj/lzma-min.js:
	@curl -sSLo obj/lzma-min.js https://unpkg.com/lzma@2.3.2/src/lzma-min.js
	@echo "1ac2db63c75e1906fabac243ce132c1dcd80341a933ee9f01f9b20cb0827ad34d47df2ffbfc3a44eab9998a086ed13df27ea5532c516f8a137ec81dd03676f32  obj/lzma-min.js" | sha512sum -c || \
		{ rm obj/lzma-min.js && false; }

js/lzma_worker-min.js: obj/lzma_worker.js
	# unpkg.com minified version doesn't work
	@$(UGLIFYJS) -- obj/lzma_worker.js >js/lzma_worker-min.js

obj/lzma_worker.js:
	@curl -sSLo obj/lzma_worker.js https://unpkg.com/lzma@2.3.2/src/lzma_worker.js
	@echo "2297888b9bb6f3afed8de7f55bfa03eb1f5950765854343d4967be3a0d64b963db8ae9dc8c4f67da79ddc4c2fca1c4d09e079c007d3eb1334bac41e81d6bbc63  obj/lzma_worker.js" | sha512sum -c || \
		{ rm obj/lzma_worker.js && false; }

obj/codeflask.min.js:
	@curl -sSLo obj/codeflask.min.js https://cdnjs.cloudflare.com/ajax/libs/codeflask/1.4.1/codeflask.min.js
	@echo "333f76769ad2e621b8637fdb8f0b1ce5fb210f91a205b244a795b4e4051b60786ade2820d5f7a06042ecbb6233d40088c73f5140f444c7cc2e4c83fb5bde30b2  obj/codeflask.min.js" | sha512sum -c || \
		{ rm obj/codeflask.min.js && false; }

obj/prism-yaml.min.js:
	@curl -sSLo obj/prism-yaml.min.js https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/prism-yaml.min.js
	@echo "5b8b048b6fab343a4de78e7225f45ab0c51f8d2cbda9d736810693267a46005a3088c3fdd286a34a0e97b9b8bc49d39fb14c14691dbdea543558e8fc694f49d8  obj/prism-yaml.min.js" | sha512sum -c || \
		{ rm obj/prism-yaml.min.js && false; }

obj/js-yaml.min.js:
	@curl -sSLo obj/js-yaml.min.js https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.14.0/js-yaml.min.js
	@echo "89af6071990b1c0fa590d493e5796c787cff368e7ef9806778cb03a7521944949b8b562a42f05eb2426e1b5911f8f1f5c3b1346c580465e81c8f4130a57427c3  obj/js-yaml.min.js" | sha512sum -c || \
		{ rm obj/js-yaml.min.js && false; }

obj/gapi.js:
	@curl -sSLo obj/gapi.js https://apis.google.com/js/api.js
	@echo "836bcd7de1ace5f64cab4fd4738c0a6395935378ffecd63c61a34b392a6013b0c3a047add115531301be96ef226abe2357b227d1cad188b769392510a652970a  obj/gapi.js" | sha512sum -c || \
		{ rm obj/gapi.js && false; }

start:
	@$(SERVE)

watch: build
	@$(ONCHANGE) -d 100 --await-write-finish 500 -o 'make build' 'src/**/*.js' -- sh -c 'echo {{event}} to {{changed}} >&2'

dev:
	@$(CONCURRENTLY) -k 'make start' 'make watch'

clean:
	@rm -rf obj js css fonts wasm node_modules
