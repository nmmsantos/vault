var LZMA=function(){"use strict";var e=1,r=2,t=3,o="function"==typeof setImmediate?setImmediate:setTimeout,n=4294967296,s=[4294967295,-n],i=[0,-0x8000000000000000],_=[0,0],a=[1,0];function c(e,r){postMessage({action:t,cbn:r,result:e})}function u(e){var r=[];return r[e-1]=void 0,r}function f(e,r){return p(e[0]+r[0],e[1]+r[1])}function m(e,r){return function(e,r){var t,o;t=e*n,o=r,r<0&&(o+=n);return[o,t]}(~~Math.max(Math.min(e[1]/n,2147483647),-2147483648)&~~Math.max(Math.min(r[1]/n,2147483647),-2147483648),l(e)&l(r))}function d(e,r){var t,o;return e[0]==r[0]&&e[1]==r[1]?0:(t=e[1]<0,o=r[1]<0,t&&!o?-1:!t&&o?1:g(e,r)[1]<0?-1:1)}function p(e,r){var t,o;for(e%=0x10000000000000000,r=(r%=0x10000000000000000)-(t=r%n)+(o=Math.floor(e/n)*n),e=e-o+t;e<0;)e+=n,r-=n;for(;e>4294967295;)e-=n,r+=n;for(r%=0x10000000000000000;r>0x7fffffff00000000;)r-=0x10000000000000000;for(;r<-0x8000000000000000;)r+=0x10000000000000000;return[e,r]}function h(e,r){return e[0]==r[0]&&e[1]==r[1]}function P(e){return e>=0?[e,0]:[e+n,-n]}function l(e){return e[0]>=2147483648?~~Math.max(Math.min(e[0]-n,2147483647),-2147483648):~~Math.max(Math.min(e[0],2147483647),-2147483648)}function v(e){return e<=30?1<<e:v(30)*v(e-30)}function B(e,r){var t,o,s,a;if(r&=63,h(e,i))return r?_:e;if(e[1]<0)throw new Error("Neg");return a=v(r),o=e[1]*a%0x10000000000000000,s=e[0]*a,s-=t=s-s%n,(o+=t)>=0x8000000000000000&&(o-=0x10000000000000000),[s,o]}function S(e,r){var t;return t=v(r&=63),p(Math.floor(e[0]/t),e[1]/t)}function g(e,r){return p(e[0]-r[0],e[1]-r[1])}function k(e,r){return e.buf=r,e.pos=0,e.count=r.length,e}function R(e){return e.pos>=e.count?-1:255&e.buf[e.pos++]}function M(e,r,t,o){return e.pos>=e.count?-1:(o=Math.min(o,e.count-e.pos),y(e.buf,e.pos,r,t,o),e.pos+=o,o)}function D(e){return e.buf=u(32),e.count=0,e}function b(e){var r=e.buf;return r.length=e.count,r}function w(e,r){e.buf[e.count++]=r<<24>>24}function E(e,r,t,o){y(r,t,e.buf,e.count,o),e.count+=o}function y(e,r,t,o,n){for(var s=0;s<n;++s)t[o+s]=e[r+s]}function C(e,r,t,o,n){var i,a;if(d(o,s)<0)throw new Error("invalid length "+o);for(e.length_0=o,function(e,r){!function(e,r){e._dictionarySize=r;for(var t=0;r>1<<t;++t);e._distTableSize=2*t}(r,1<<e.s),r._numFastBytes=e.f,function(e,r){var t=e._matchFinderType;e._matchFinderType=r,e._matchFinder&&t!=e._matchFinderType&&(e._dictionarySizePrev=-1,e._matchFinder=null)}(r,e.m),r._numLiteralPosStateBits=0,r._numLiteralContextBits=3,r._posStateBits=2,r._posStateMask=3}(n,i=function(e){var r;for(e._repDistances=u(4),e._optimum=[],e._rangeEncoder={},e._isMatch=u(192),e._isRep=u(12),e._isRepG0=u(12),e._isRepG1=u(12),e._isRepG2=u(12),e._isRep0Long=u(192),e._posSlotEncoder=[],e._posEncoders=u(114),e._posAlignEncoder=De({},4),e._lenEncoder=pe({}),e._repMatchLenEncoder=pe({}),e._literalEncoder={},e._matchDistances=[],e._posSlotPrices=[],e._distancesPrices=[],e._alignPrices=u(16),e.reps=u(4),e.repLens=u(4),e.processedInSize=[_],e.processedOutSize=[_],e.finished=[0],e.properties=u(5),e.tempPrices=u(128),e._longestMatchLength=0,e._matchFinderType=1,e._numDistancePairs=0,e._numFastBytesPrev=-1,e.backRes=0,r=0;r<4096;++r)e._optimum[r]={};for(r=0;r<4;++r)e._posSlotEncoder[r]=De({},6);return e}({})),i._writeEndMark=void 0===LZMA.disableEndMark,function(e,r){e.properties[0]=9*(5*e._posStateBits+e._numLiteralPosStateBits)+e._numLiteralContextBits<<24>>24;for(var t=0;t<4;++t)e.properties[1+t]=e._dictionarySize>>8*t<<24>>24;E(r,e.properties,0,5)}(i,t),a=0;a<64;a+=8)w(t,255&l(S(o,a)));e.chunker=(i._needReleaseMFStream=0,i._inStream=r,i._finished=0,function(e){var r,t;e._matchFinder||(r={},t=4,e._matchFinderType||(t=2),function(e,r){e.HASH_ARRAY=r>2,e.HASH_ARRAY?(e.kNumHashDirectBytes=0,e.kMinMatchCheck=4,e.kFixHashSize=66560):(e.kNumHashDirectBytes=2,e.kMinMatchCheck=3,e.kFixHashSize=0)}(r,t),e._matchFinder=r);if(function(e,r,t){var o,n;if(null==e.m_Coders||e.m_NumPrevBits!=t||e.m_NumPosBits!=r)for(e.m_NumPosBits=r,e.m_PosMask=(1<<r)-1,e.m_NumPrevBits=t,n=1<<e.m_NumPrevBits+e.m_NumPosBits,e.m_Coders=u(n),o=0;o<n;++o)e.m_Coders[o]=Se({})}(e._literalEncoder,e._numLiteralPosStateBits,e._numLiteralContextBits),e._dictionarySize==e._dictionarySizePrev&&e._numFastBytesPrev==e._numFastBytes)return;(function(e,r,t,o,n){var s,i;r<1073741567&&(e._cutValue=16+(o>>1),function(e,r,t,o){var n;e._keepSizeBefore=r,e._keepSizeAfter=t,n=r+t+o,(null==e._bufferBase||e._blockSize!=n)&&(e._bufferBase=null,e._blockSize=n,e._bufferBase=u(e._blockSize));e._pointerToLastSafePosition=e._blockSize-t}(e,r+t,o+n,256+~~((r+t+o+n)/2)),e._matchMaxLen=o,s=r+1,e._cyclicBufferSize!=s&&(e._son=u(2*(e._cyclicBufferSize=s))),i=65536,e.HASH_ARRAY&&(i=r-1,i|=i>>1,i|=i>>2,i|=i>>4,i|=i>>8,i>>=1,(i|=65535)>16777216&&(i>>=1),e._hashMask=i,++i,i+=e.kFixHashSize),i!=e._hashSizeSum&&(e._hash=u(e._hashSizeSum=i)))})(e._matchFinder,e._dictionarySize,4096,e._numFastBytes,274),e._dictionarySizePrev=e._dictionarySize,e._numFastBytesPrev=e._numFastBytes}(i),i._rangeEncoder.Stream=t,function(e){(function(e){e._state=0,e._previousByte=0;for(var r=0;r<4;++r)e._repDistances[r]=0})(e),function(e){e._position=_,e.Low=_,e.Range=-1,e._cacheSize=1,e._cache=0}(e._rangeEncoder),Fe(e._isMatch),Fe(e._isRep0Long),Fe(e._isRep),Fe(e._isRepG0),Fe(e._isRepG1),Fe(e._isRepG2),Fe(e._posEncoders),function(e){var r,t=1<<e.m_NumPrevBits+e.m_NumPosBits;for(r=0;r<t;++r)Fe(e.m_Coders[r].m_Encoders)}(e._literalEncoder);for(var r=0;r<4;++r)Fe(e._posSlotEncoder[r].Models);fe(e._lenEncoder,1<<e._posStateBits),fe(e._repMatchLenEncoder,1<<e._posStateBits),Fe(e._posAlignEncoder.Models),e._longestMatchWasFound=0,e._optimumEndIndex=0,e._optimumCurrentIndex=0,e._additionalOffset=0}(i),te(i),re(i),i._lenEncoder._tableSize=i._numFastBytes+1-2,Pe(i._lenEncoder,1<<i._posStateBits),i._repMatchLenEncoder._tableSize=i._numFastBytes+1-2,Pe(i._repMatchLenEncoder,1<<i._posStateBits),i.nowPos64=_,function(e,r){return e.encoder=r,e.decoder=null,e.alive=1,e}({},i))}function L(e,r,t){return e.output=D({}),C(e,k({},r),e.output,P(r.length),t),e}function z(e,r,t){var o,n,i,a,c="",f=[];for(n=0;n<5;++n){if(-1==(i=R(r)))throw new Error("truncated input");f[n]=i<<24>>24}if(!function(e,r){var t,o,n,s,i,_,a;if(r.length<5)return 0;for(a=255&r[0],n=a%9,s=(_=~~(a/9))%5,i=~~(_/5),t=0,o=0;o<4;++o)t+=(255&r[1+o])<<8*o;if(t>99999999||!function(e,r,t,o){if(r>8||t>4||o>4)return 0;!function(e,r,t){var o,n;if(null!=e.m_Coders&&e.m_NumPrevBits==t&&e.m_NumPosBits==r)return;for(e.m_NumPosBits=r,e.m_PosMask=(1<<r)-1,e.m_NumPrevBits=t,n=1<<e.m_NumPrevBits+e.m_NumPosBits,e.m_Coders=u(n),o=0;o<n;++o)e.m_Coders[o]=U({})}(e.m_LiteralDecoder,t,r);var n=1<<o;return K(e.m_LenDecoder,n),K(e.m_RepLenDecoder,n),e.m_PosStateMask=n-1,1}(e,n,s,i))return 0;return function(e,r){if(r<0)return 0;e.m_DictionarySize!=r&&(e.m_DictionarySize=r,e.m_DictionarySizeCheck=Math.max(e.m_DictionarySize,1),function(e,r){null!=e._buffer&&e._windowSize==r||(e._buffer=u(r));e._windowSize=r,e._pos=0,e._streamPos=0}(e.m_OutWindow,Math.max(e.m_DictionarySizeCheck,4096)));return 1}(e,t)}(o=function(e){e.m_OutWindow={},e.m_RangeDecoder={},e.m_IsMatchDecoders=u(192),e.m_IsRepDecoders=u(12),e.m_IsRepG0Decoders=u(12),e.m_IsRepG1Decoders=u(12),e.m_IsRepG2Decoders=u(12),e.m_IsRep0LongDecoders=u(192),e.m_PosSlotDecoder=u(4),e.m_PosDecoders=u(114),e.m_PosAlignDecoder=Re({},4),e.m_LenDecoder=J({}),e.m_RepLenDecoder=J({}),e.m_LiteralDecoder={};for(var r=0;r<4;++r)e.m_PosSlotDecoder[r]=Re({},6);return e}({}),f))throw new Error("corrupted input");for(n=0;n<64;n+=8){if(-1==(i=R(r)))throw new Error("truncated input");1==(i=i.toString(16)).length&&(i="0"+i),c=i+""+c}/^0+$|^f+$/i.test(c)?e.length_0=s:(a=parseInt(c,16),e.length_0=a>4294967295?s:P(a)),e.chunker=function(e,r,t,o){return e.m_RangeDecoder.Stream=r,Y(e.m_OutWindow),e.m_OutWindow._stream=t,function(e){e.m_OutWindow._streamPos=0,e.m_OutWindow._pos=0,Fe(e.m_IsMatchDecoders),Fe(e.m_IsRep0LongDecoders),Fe(e.m_IsRepDecoders),Fe(e.m_IsRepG0Decoders),Fe(e.m_IsRepG1Decoders),Fe(e.m_IsRepG2Decoders),Fe(e.m_PosDecoders),function(e){var r,t;for(t=1<<e.m_NumPrevBits+e.m_NumPosBits,r=0;r<t;++r)Fe(e.m_Coders[r].m_Decoders)}(e.m_LiteralDecoder);for(var r=0;r<4;++r)Fe(e.m_PosSlotDecoder[r].Models);Q(e.m_LenDecoder),Q(e.m_RepLenDecoder),Fe(e.m_PosAlignDecoder.Models),function(e){e.Code=0,e.Range=-1;for(var r=0;r<5;++r)e.Code=e.Code<<8|R(e.Stream)}(e.m_RangeDecoder)}(e),e.state=0,e.rep0=0,e.rep1=0,e.rep2=0,e.rep3=0,e.outSize=o,e.nowPos64=_,e.prevByte=0,function(e,r){return e.decoder=r,e.encoder=null,e.alive=1,e}({},e)}(o,r,t,e.length_0)}function F(e,r){return e.output=D({}),z(e,k({},r),e.output),e}function I(e,r){return e._bufferBase[e._bufferOffset+e._pos+r]}function x(e,r,t,o){var n,s;for(e._streamEndWasReached&&e._pos+r+o>e._streamPos&&(o=e._streamPos-(e._pos+r)),++t,s=e._bufferOffset+e._pos+r,n=0;n<o&&e._bufferBase[s+n]==e._bufferBase[s+n-t];++n);return n}function N(e){return e._streamPos-e._pos}function O(e){var r,t;if(!e._streamEndWasReached)for(;;){if(!(t=-e._bufferOffset+e._blockSize-e._streamPos))return;if(-1==(r=M(e._stream,e._bufferBase,e._bufferOffset+e._streamPos,t)))return e._posLimit=e._streamPos,e._bufferOffset+e._posLimit>e._pointerToLastSafePosition&&(e._posLimit=e._pointerToLastSafePosition-e._bufferOffset),void(e._streamEndWasReached=1);e._streamPos+=r,e._streamPos>=e._pos+e._keepSizeAfter&&(e._posLimit=e._streamPos-e._keepSizeAfter)}}function A(e,r){e._bufferOffset+=r,e._posLimit-=r,e._pos-=r,e._streamPos-=r}var H=function(){var e,r,t,o=[];for(e=0;e<256;++e){for(t=e,r=0;r<8;++r)0!=(1&t)?t=t>>>1^-306674912:t>>>=1;o[e]=t}return o}();function G(e){var r;++e._cyclicBufferPos>=e._cyclicBufferSize&&(e._cyclicBufferPos=0),function(e){++e._pos,e._pos>e._posLimit&&(e._bufferOffset+e._pos>e._pointerToLastSafePosition&&function(e){var r,t,o;for((o=e._bufferOffset+e._pos-e._keepSizeBefore)>0&&--o,t=e._bufferOffset+e._streamPos-o,r=0;r<t;++r)e._bufferBase[r]=e._bufferBase[o+r];e._bufferOffset-=o}(e),O(e))}(e),1073741823==e._pos&&(r=e._pos-e._cyclicBufferSize,W(e._son,2*e._cyclicBufferSize,r),W(e._hash,e._hashSizeSum,r),A(e,r))}function W(e,r,t){var o,n;for(o=0;o<r;++o)(n=e[o]||0)<=t?n=0:n-=t,e[o]=n}function T(e){var r=e._pos-e._streamPos;r&&(E(e._stream,e._buffer,e._streamPos,r),e._pos>=e._windowSize&&(e._pos=0),e._streamPos=e._pos)}function Z(e,r){var t=e._pos-r-1;return t<0&&(t+=e._windowSize),e._buffer[t]}function Y(e){T(e),e._stream=null}function V(e){return(e-=2)<4?e:3}function j(e){return e<4?0:e<10?e-3:e-6}function $(e){if(!e.alive)throw new Error("bad state");return e.encoder?function(e){(function(e,r,t,o){var n,s,i,c,u,m,p,v,B,S,k,R,M,D,b;if(r[0]=_,t[0]=_,o[0]=1,e._inStream&&(e._matchFinder._stream=e._inStream,function(e){e._bufferOffset=0,e._pos=0,e._streamPos=0,e._streamEndWasReached=0,O(e),e._cyclicBufferPos=0,A(e,-1)}(e._matchFinder),e._needReleaseMFStream=1,e._inStream=null),!e._finished){if(e._finished=1,D=e.nowPos64,h(e.nowPos64,_)){if(!N(e._matchFinder))return void oe(e,l(e.nowPos64));ae(e),M=l(e.nowPos64)&e._posStateMask,xe(e._rangeEncoder,e._isMatch,(e._state<<4)+M,0),e._state=j(e._state),i=I(e._matchFinder,-e._additionalOffset),ve(le(e._literalEncoder,l(e.nowPos64),e._previousByte),e._rangeEncoder,i),e._previousByte=i,--e._additionalOffset,e.nowPos64=f(e.nowPos64,a)}if(N(e._matchFinder))for(;;){if(p=ne(e,l(e.nowPos64)),S=e.backRes,M=l(e.nowPos64)&e._posStateMask,s=(e._state<<4)+M,1==p&&-1==S)xe(e._rangeEncoder,e._isMatch,s,0),i=I(e._matchFinder,-e._additionalOffset),b=le(e._literalEncoder,l(e.nowPos64),e._previousByte),e._state<7?ve(b,e._rangeEncoder,i):(B=I(e._matchFinder,-e._repDistances[0]-1-e._additionalOffset),Be(b,e._rangeEncoder,B,i)),e._previousByte=i,e._state=j(e._state);else{if(xe(e._rangeEncoder,e._isMatch,s,1),S<4){if(xe(e._rangeEncoder,e._isRep,e._state,1),S?(xe(e._rangeEncoder,e._isRepG0,e._state,1),1==S?xe(e._rangeEncoder,e._isRepG1,e._state,0):(xe(e._rangeEncoder,e._isRepG1,e._state,1),xe(e._rangeEncoder,e._isRepG2,e._state,S-2))):(xe(e._rangeEncoder,e._isRepG0,e._state,0),xe(e._rangeEncoder,e._isRep0Long,s,1==p?0:1)),1==p?e._state=e._state<7?9:11:(de(e._repMatchLenEncoder,e._rangeEncoder,p-2,M),e._state=e._state<7?8:11),c=e._repDistances[S],0!=S){for(m=S;m>=1;--m)e._repDistances[m]=e._repDistances[m-1];e._repDistances[0]=c}}else{for(xe(e._rangeEncoder,e._isRep,e._state,0),e._state=e._state<7?7:10,de(e._lenEncoder,e._rangeEncoder,p-2,M),R=ue(S-=4),v=V(p),be(e._posSlotEncoder[v],e._rangeEncoder,R),R>=4&&(k=S-(n=(2|1&R)<<(u=(R>>1)-1)),R<14?Ce(e._posEncoders,n-R-1,e._rangeEncoder,u,k):(Ne(e._rangeEncoder,k>>4,u-4),Ee(e._posAlignEncoder,e._rangeEncoder,15&k),++e._alignPriceCount)),c=S,m=3;m>=1;--m)e._repDistances[m]=e._repDistances[m-1];e._repDistances[0]=c,++e._matchPriceCount}e._previousByte=I(e._matchFinder,p-1-e._additionalOffset)}if(e._additionalOffset-=p,e.nowPos64=f(e.nowPos64,P(p)),!e._additionalOffset){if(e._matchPriceCount>=128&&te(e),e._alignPriceCount>=16&&re(e),r[0]=e.nowPos64,t[0]=Oe(e._rangeEncoder),!N(e._matchFinder))return void oe(e,l(e.nowPos64));if(d(g(e.nowPos64,D),[4096,0])>=0)return e._finished=0,void(o[0]=0)}}else oe(e,l(e.nowPos64))}})(e.encoder,e.encoder.processedInSize,e.encoder.processedOutSize,e.encoder.finished),e.inBytesProcessed=e.encoder.processedInSize[0],e.encoder.finished[0]&&(!function(e){ce(e),e._rangeEncoder.Stream=null}(e.encoder),e.alive=0)}(e):function(e){var r=function(e){var r,t,o,n,s,i;if(i=l(e.nowPos64)&e.m_PosStateMask,ze(e.m_RangeDecoder,e.m_IsMatchDecoders,(e.state<<4)+i)){if(ze(e.m_RangeDecoder,e.m_IsRepDecoders,e.state))o=0,ze(e.m_RangeDecoder,e.m_IsRepG0Decoders,e.state)?(ze(e.m_RangeDecoder,e.m_IsRepG1Decoders,e.state)?(ze(e.m_RangeDecoder,e.m_IsRepG2Decoders,e.state)?(t=e.rep3,e.rep3=e.rep2):t=e.rep2,e.rep2=e.rep1):t=e.rep1,e.rep1=e.rep0,e.rep0=t):ze(e.m_RangeDecoder,e.m_IsRep0LongDecoders,(e.state<<4)+i)||(e.state=e.state<7?9:11,o=1),o||(o=q(e.m_RepLenDecoder,e.m_RangeDecoder,i)+2,e.state=e.state<7?8:11);else if(e.rep3=e.rep2,e.rep2=e.rep1,e.rep1=e.rep0,o=2+q(e.m_LenDecoder,e.m_RangeDecoder,i),e.state=e.state<7?7:10,(s=Me(e.m_PosSlotDecoder[V(o)],e.m_RangeDecoder))>=4){if(n=(s>>1)-1,e.rep0=(2|1&s)<<n,s<14)e.rep0+=function(e,r,t,o){var n,s,i=1,_=0;for(s=0;s<o;++s)n=ze(t,e,r+i),i<<=1,i+=n,_|=n<<s;return _}(e.m_PosDecoders,e.rep0-s-1,e.m_RangeDecoder,n);else if(e.rep0+=function(e,r){var t,o,n=0;for(t=r;0!=t;--t)e.Range>>>=1,o=e.Code-e.Range>>>31,e.Code-=e.Range&o-1,n=n<<1|1-o,-16777216&e.Range||(e.Code=e.Code<<8|R(e.Stream),e.Range<<=8);return n}(e.m_RangeDecoder,n-4)<<4,e.rep0+=function(e,r){var t,o,n=1,s=0;for(o=0;o<e.NumBitLevels;++o)t=ze(r,e.Models,n),n<<=1,n+=t,s|=t<<o;return s}(e.m_PosAlignDecoder,e.m_RangeDecoder),e.rep0<0)return-1==e.rep0?1:-1}else e.rep0=s;if(d(P(e.rep0),e.nowPos64)>=0||e.rep0>=e.m_DictionarySizeCheck)return-1;!function(e,r,t){var o=e._pos-r-1;for(o<0&&(o+=e._windowSize);0!=t;--t)o>=e._windowSize&&(o=0),e._buffer[e._pos++]=e._buffer[o++],e._pos>=e._windowSize&&T(e)}(e.m_OutWindow,e.rep0,o),e.nowPos64=f(e.nowPos64,P(o)),e.prevByte=Z(e.m_OutWindow,0)}else r=function(e,r,t){return e.m_Coders[((r&e.m_PosMask)<<e.m_NumPrevBits)+((255&t)>>>8-e.m_NumPrevBits)]}(e.m_LiteralDecoder,l(e.nowPos64),e.prevByte),e.state<7?e.prevByte=function(e,r){var t=1;do{t=t<<1|ze(r,e.m_Decoders,t)}while(t<256);return t<<24>>24}(r,e.m_RangeDecoder):e.prevByte=function(e,r,t){var o,n,s=1;do{if(n=t>>7&1,t<<=1,o=ze(r,e.m_Decoders,(1+n<<8)+s),s=s<<1|o,n!=o){for(;s<256;)s=s<<1|ze(r,e.m_Decoders,s);break}}while(s<256);return s<<24>>24}(r,e.m_RangeDecoder,Z(e.m_OutWindow,e.rep0)),function(e,r){e._buffer[e._pos++]=r,e._pos>=e._windowSize&&T(e)}(e.m_OutWindow,e.prevByte),e.state=j(e.state),e.nowPos64=f(e.nowPos64,a);return 0}(e.decoder);if(-1==r)throw new Error("corrupted input");e.inBytesProcessed=s,e.outBytesProcessed=e.decoder.nowPos64,(r||d(e.decoder.outSize,_)>=0&&d(e.decoder.nowPos64,e.decoder.outSize)>=0)&&(T(e.decoder.m_OutWindow),Y(e.decoder.m_OutWindow),e.decoder.m_RangeDecoder.Stream=null,e.alive=0)}(e),e.alive}function K(e,r){for(;e.m_NumPosStates<r;++e.m_NumPosStates)e.m_LowCoder[e.m_NumPosStates]=Re({},3),e.m_MidCoder[e.m_NumPosStates]=Re({},3)}function q(e,r,t){if(!ze(r,e.m_Choice,0))return Me(e.m_LowCoder[t],r);var o=8;return ze(r,e.m_Choice,1)?o+=8+Me(e.m_HighCoder,r):o+=Me(e.m_MidCoder[t],r),o}function J(e){return e.m_Choice=u(2),e.m_LowCoder=u(16),e.m_MidCoder=u(16),e.m_HighCoder=Re({},8),e.m_NumPosStates=0,e}function Q(e){Fe(e.m_Choice);for(var r=0;r<e.m_NumPosStates;++r)Fe(e.m_LowCoder[r].Models),Fe(e.m_MidCoder[r].Models);Fe(e.m_HighCoder.Models)}function U(e){return e.m_Decoders=u(768),e}var X=function(){var e,r,t,o=2,n=[0,1];for(t=2;t<22;++t)for(r=1<<(t>>1)-1,e=0;e<r;++e,++o)n[o]=t<<24>>24;return n}();function ee(e,r){var t,o,n,s;e._optimumEndIndex=r,n=e._optimum[r].PosPrev,o=e._optimum[r].BackPrev;do{e._optimum[r].Prev1IsChar&&(ke(e._optimum[n]),e._optimum[n].PosPrev=n-1,e._optimum[r].Prev2&&(e._optimum[n-1].Prev1IsChar=0,e._optimum[n-1].PosPrev=e._optimum[r].PosPrev2,e._optimum[n-1].BackPrev=e._optimum[r].BackPrev2)),s=n,t=o,o=e._optimum[s].BackPrev,n=e._optimum[s].PosPrev,e._optimum[s].BackPrev=t,e._optimum[s].PosPrev=r,r=s}while(r>0);return e.backRes=e._optimum[0].BackPrev,e._optimumCurrentIndex=e._optimum[0].PosPrev,e._optimumCurrentIndex}function re(e){for(var r=0;r<16;++r)e._alignPrices[r]=ye(e._posAlignEncoder,r);e._alignPriceCount=0}function te(e){var r,t,o,n,s,i,_,a;for(n=4;n<128;++n)r=(2|1&(i=ue(n)))<<(o=(i>>1)-1),e.tempPrices[n]=Le(e._posEncoders,r-i-1,o,n-r);for(s=0;s<4;++s){for(t=e._posSlotEncoder[s],_=s<<6,i=0;i<e._distTableSize;++i)e._posSlotPrices[_+i]=we(t,i);for(i=14;i<e._distTableSize;++i)e._posSlotPrices[_+i]+=(i>>1)-1-4<<6;for(a=128*s,n=0;n<4;++n)e._distancesPrices[a+n]=e._posSlotPrices[_+n];for(;n<128;++n)e._distancesPrices[a+n]=e._posSlotPrices[_+ue(n)]+e.tempPrices[n]}e._matchPriceCount=0}function oe(e,r){ce(e),function(e,r){if(!e._writeEndMark)return;xe(e._rangeEncoder,e._isMatch,(e._state<<4)+r,1),xe(e._rangeEncoder,e._isRep,e._state,0),e._state=e._state<7?7:10,de(e._lenEncoder,e._rangeEncoder,0,r);var t=V(2);be(e._posSlotEncoder[t],e._rangeEncoder,63),Ne(e._rangeEncoder,67108863,26),Ee(e._posAlignEncoder,e._rangeEncoder,15)}(e,r&e._posStateMask);for(var t=0;t<5;++t)Ae(e._rangeEncoder)}function ne(e,r){var t,o,n,s,i,_,a,c,u,f,m,d,p,h,P,l,v,B,S,g,k,R,M,D,b,w,E,y,C,L,z,F,O,A,H,G,W,T,Z,Y,V,$,K,q;if(e._optimumEndIndex!=e._optimumCurrentIndex)return p=e._optimum[e._optimumCurrentIndex].PosPrev-e._optimumCurrentIndex,e.backRes=e._optimum[e._optimumCurrentIndex].BackPrev,e._optimumCurrentIndex=e._optimum[e._optimumCurrentIndex].PosPrev,p;if(e._optimumCurrentIndex=e._optimumEndIndex=0,e._longestMatchWasFound?(d=e._longestMatchLength,e._longestMatchWasFound=0):d=ae(e),w=e._numDistancePairs,(D=N(e._matchFinder)+1)<2)return e.backRes=-1,1;for(D>273&&(D=273),Z=0,u=0;u<4;++u)e.reps[u]=e._repDistances[u],e.repLens[u]=x(e._matchFinder,-1,e.reps[u],273),e.repLens[u]>e.repLens[Z]&&(Z=u);if(e.repLens[Z]>=e._numFastBytes)return e.backRes=Z,_e(e,(p=e.repLens[Z])-1),p;if(d>=e._numFastBytes)return e.backRes=e._matchDistances[w-1]+4,_e(e,d-1),d;if(a=I(e._matchFinder,-1),v=I(e._matchFinder,-e._repDistances[0]-1-1),d<2&&a!=v&&e.repLens[Z]<2)return e.backRes=-1,1;if(e._optimum[0].State=e._state,O=r&e._posStateMask,e._optimum[1].Price=Ie[e._isMatch[(e._state<<4)+O]>>>2]+ge(le(e._literalEncoder,r,e._previousByte),e._state>=7,v,a),ke(e._optimum[1]),T=(B=Ie[2048-e._isMatch[(e._state<<4)+O]>>>2])+Ie[2048-e._isRep[e._state]>>>2],v==a&&(Y=T+function(e,r,t){return Ie[e._isRepG0[r]>>>2]+Ie[e._isRep0Long[(r<<4)+t]>>>2]}(e,e._state,O))<e._optimum[1].Price&&(e._optimum[1].Price=Y,function(e){e.BackPrev=0,e.Prev1IsChar=0}(e._optimum[1])),(m=d>=e.repLens[Z]?d:e.repLens[Z])<2)return e.backRes=e._optimum[1].BackPrev,1;e._optimum[1].PosPrev=0,e._optimum[0].Backs0=e.reps[0],e._optimum[0].Backs1=e.reps[1],e._optimum[0].Backs2=e.reps[2],e._optimum[0].Backs3=e.reps[3],f=m;do{e._optimum[f--].Price=268435455}while(f>=2);for(u=0;u<4;++u)if(!((W=e.repLens[u])<2)){H=T+ie(e,u,e._state,O);do{(s=H+he(e._repMatchLenEncoder,W-2,O))<(L=e._optimum[W]).Price&&(L.Price=s,L.PosPrev=0,L.BackPrev=u,L.Prev1IsChar=0)}while(--W>=2)}if(M=B+Ie[e._isRep[e._state]>>>2],(f=e.repLens[0]>=2?e.repLens[0]+1:2)<=d){for(E=0;f>e._matchDistances[E];)E+=2;for(;(s=M+se(e,c=e._matchDistances[E+1],f,O))<(L=e._optimum[f]).Price&&(L.Price=s,L.PosPrev=0,L.BackPrev=c+4,L.Prev1IsChar=0),f!=e._matchDistances[E]||(E+=2)!=w;++f);}for(t=0;;){if(++t==m)return ee(e,t);if(S=ae(e),w=e._numDistancePairs,S>=e._numFastBytes)return e._longestMatchLength=S,e._longestMatchWasFound=1,ee(e,t);if(++r,F=e._optimum[t].PosPrev,e._optimum[t].Prev1IsChar?(--F,e._optimum[t].Prev2?($=e._optimum[e._optimum[t].PosPrev2].State,$=e._optimum[t].BackPrev2<4?$<7?8:11:$<7?7:10):$=e._optimum[F].State,$=j($)):$=e._optimum[F].State,F==t-1?$=e._optimum[t].BackPrev?j($):$<7?9:11:(e._optimum[t].Prev1IsChar&&e._optimum[t].Prev2?(F=e._optimum[t].PosPrev2,z=e._optimum[t].BackPrev2,$=$<7?8:11):$=(z=e._optimum[t].BackPrev)<4?$<7?8:11:$<7?7:10,C=e._optimum[F],z<4?z?1==z?(e.reps[0]=C.Backs1,e.reps[1]=C.Backs0,e.reps[2]=C.Backs2,e.reps[3]=C.Backs3):2==z?(e.reps[0]=C.Backs2,e.reps[1]=C.Backs0,e.reps[2]=C.Backs1,e.reps[3]=C.Backs3):(e.reps[0]=C.Backs3,e.reps[1]=C.Backs0,e.reps[2]=C.Backs1,e.reps[3]=C.Backs2):(e.reps[0]=C.Backs0,e.reps[1]=C.Backs1,e.reps[2]=C.Backs2,e.reps[3]=C.Backs3):(e.reps[0]=z-4,e.reps[1]=C.Backs0,e.reps[2]=C.Backs1,e.reps[3]=C.Backs2)),e._optimum[t].State=$,e._optimum[t].Backs0=e.reps[0],e._optimum[t].Backs1=e.reps[1],e._optimum[t].Backs2=e.reps[2],e._optimum[t].Backs3=e.reps[3],_=e._optimum[t].Price,a=I(e._matchFinder,-1),v=I(e._matchFinder,-e.reps[0]-1-1),O=r&e._posStateMask,g=0,(o=_+Ie[e._isMatch[($<<4)+O]>>>2]+ge(le(e._literalEncoder,r,I(e._matchFinder,-2)),$>=7,v,a))<(k=e._optimum[t+1]).Price&&(k.Price=o,k.PosPrev=t,k.BackPrev=-1,k.Prev1IsChar=0,g=1),T=(B=_+Ie[2048-e._isMatch[($<<4)+O]>>>2])+Ie[2048-e._isRep[$]>>>2],v!=a||k.PosPrev<t&&!k.BackPrev||(Y=T+(Ie[e._isRepG0[$]>>>2]+Ie[e._isRep0Long[($<<4)+O]>>>2]))<=k.Price&&(k.Price=Y,k.PosPrev=t,k.BackPrev=0,k.Prev1IsChar=0,g=1),!((D=b=4095-t<(b=N(e._matchFinder)+1)?4095-t:b)<2)){if(D>e._numFastBytes&&(D=e._numFastBytes),!g&&v!=a&&(q=Math.min(b-1,e._numFastBytes),(P=x(e._matchFinder,0,e.reps[0],q))>=2)){for(K=j($),A=r+1&e._posStateMask,R=o+Ie[2048-e._isMatch[(K<<4)+A]>>>2]+Ie[2048-e._isRep[K]>>>2],y=t+1+P;m<y;)e._optimum[++m].Price=268435455;(s=R+(he(e._repMatchLenEncoder,P-2,A)+ie(e,0,K,A)))<(L=e._optimum[y]).Price&&(L.Price=s,L.PosPrev=t+1,L.BackPrev=0,L.Prev1IsChar=1,L.Prev2=0)}for(V=2,G=0;G<4;++G)if(!((h=x(e._matchFinder,-1,e.reps[G],D))<2)){l=h;do{for(;m<t+h;)e._optimum[++m].Price=268435455;(s=T+(he(e._repMatchLenEncoder,h-2,O)+ie(e,G,$,O)))<(L=e._optimum[t+h]).Price&&(L.Price=s,L.PosPrev=t,L.BackPrev=G,L.Prev1IsChar=0)}while(--h>=2);if(h=l,G||(V=h+1),h<b&&(q=Math.min(b-1-h,e._numFastBytes),(P=x(e._matchFinder,h,e.reps[G],q))>=2)){for(K=$<7?8:11,A=r+h&e._posStateMask,n=T+(he(e._repMatchLenEncoder,h-2,O)+ie(e,G,$,O))+Ie[e._isMatch[(K<<4)+A]>>>2]+ge(le(e._literalEncoder,r+h,I(e._matchFinder,h-1-1)),1,I(e._matchFinder,h-1-(e.reps[G]+1)),I(e._matchFinder,h-1)),K=j(K),A=r+h+1&e._posStateMask,R=n+Ie[2048-e._isMatch[(K<<4)+A]>>>2]+Ie[2048-e._isRep[K]>>>2],y=h+1+P;m<t+y;)e._optimum[++m].Price=268435455;(s=R+(he(e._repMatchLenEncoder,P-2,A)+ie(e,0,K,A)))<(L=e._optimum[t+y]).Price&&(L.Price=s,L.PosPrev=t+h+1,L.BackPrev=0,L.Prev1IsChar=1,L.Prev2=1,L.PosPrev2=t,L.BackPrev2=G)}}if(S>D){for(S=D,w=0;S>e._matchDistances[w];w+=2);e._matchDistances[w]=S,w+=2}if(S>=V){for(M=B+Ie[e._isRep[$]>>>2];m<t+S;)e._optimum[++m].Price=268435455;for(E=0;V>e._matchDistances[E];)E+=2;for(h=V;;++h)if((s=M+se(e,i=e._matchDistances[E+1],h,O))<(L=e._optimum[t+h]).Price&&(L.Price=s,L.PosPrev=t,L.BackPrev=i+4,L.Prev1IsChar=0),h==e._matchDistances[E]){if(h<b&&(q=Math.min(b-1-h,e._numFastBytes),(P=x(e._matchFinder,h,i,q))>=2)){for(K=$<7?7:10,A=r+h&e._posStateMask,n=s+Ie[e._isMatch[(K<<4)+A]>>>2]+ge(le(e._literalEncoder,r+h,I(e._matchFinder,h-1-1)),1,I(e._matchFinder,h-(i+1)-1),I(e._matchFinder,h-1)),K=j(K),A=r+h+1&e._posStateMask,R=n+Ie[2048-e._isMatch[(K<<4)+A]>>>2]+Ie[2048-e._isRep[K]>>>2],y=h+1+P;m<t+y;)e._optimum[++m].Price=268435455;(s=R+(he(e._repMatchLenEncoder,P-2,A)+ie(e,0,K,A)))<(L=e._optimum[t+y]).Price&&(L.Price=s,L.PosPrev=t+h+1,L.BackPrev=0,L.Prev1IsChar=1,L.Prev2=1,L.PosPrev2=t,L.BackPrev2=i+4)}if((E+=2)==w)break}}}}}function se(e,r,t,o){var n=V(t);return(r<128?e._distancesPrices[128*n+r]:e._posSlotPrices[(n<<6)+function(e){if(e<131072)return X[e>>6]+12;if(e<134217728)return X[e>>16]+32;return X[e>>26]+52}(r)]+e._alignPrices[15&r])+he(e._lenEncoder,t-2,o)}function ie(e,r,t,o){var n;return r?(n=Ie[2048-e._isRepG0[t]>>>2],1==r?n+=Ie[e._isRepG1[t]>>>2]:(n+=Ie[2048-e._isRepG1[t]>>>2],n+=He(e._isRepG2[t],r-2))):(n=Ie[e._isRepG0[t]>>>2],n+=Ie[2048-e._isRep0Long[(t<<4)+o]>>>2]),n}function _e(e,r){r>0&&(!function(e,r){var t,o,n,s,i,_,a,c,u,f,m,d,p,h,P,l,v;do{if(e._pos+e._matchMaxLen<=e._streamPos)d=e._matchMaxLen;else if((d=e._streamPos-e._pos)<e.kMinMatchCheck){G(e);continue}for(p=e._pos>e._cyclicBufferSize?e._pos-e._cyclicBufferSize:0,o=e._bufferOffset+e._pos,e.HASH_ARRAY?(_=1023&(v=H[255&e._bufferBase[o]]^255&e._bufferBase[o+1]),e._hash[_]=e._pos,a=65535&(v^=(255&e._bufferBase[o+2])<<8),e._hash[1024+a]=e._pos,c=(v^H[255&e._bufferBase[o+3]]<<5)&e._hashMask):c=255&e._bufferBase[o]^(255&e._bufferBase[o+1])<<8,n=e._hash[e.kFixHashSize+c],e._hash[e.kFixHashSize+c]=e._pos,P=1+(e._cyclicBufferPos<<1),l=e._cyclicBufferPos<<1,f=m=e.kNumHashDirectBytes,t=e._cutValue;;){if(n<=p||0==t--){e._son[P]=e._son[l]=0;break}if(s=((i=e._pos-n)<=e._cyclicBufferPos?e._cyclicBufferPos-i:e._cyclicBufferPos-i+e._cyclicBufferSize)<<1,h=e._bufferOffset+n,u=f<m?f:m,e._bufferBase[h+u]==e._bufferBase[o+u]){for(;++u!=d&&e._bufferBase[h+u]==e._bufferBase[o+u];);if(u==d){e._son[l]=e._son[s],e._son[P]=e._son[s+1];break}}(255&e._bufferBase[h+u])<(255&e._bufferBase[o+u])?(e._son[l]=n,l=s+1,n=e._son[l],m=u):(e._son[P]=n,P=s,n=e._son[P],f=u)}G(e)}while(0!=--r)}(e._matchFinder,r),e._additionalOffset+=r)}function ae(e){var r=0;return e._numDistancePairs=function(e,r){var t,o,n,s,i,_,a,c,u,f,m,d,p,h,P,l,v,B,S,g,k;if(e._pos+e._matchMaxLen<=e._streamPos)h=e._matchMaxLen;else if((h=e._streamPos-e._pos)<e.kMinMatchCheck)return G(e),0;for(v=0,P=e._pos>e._cyclicBufferSize?e._pos-e._cyclicBufferSize:0,o=e._bufferOffset+e._pos,l=1,c=0,u=0,e.HASH_ARRAY?(c=1023&(k=H[255&e._bufferBase[o]]^255&e._bufferBase[o+1]),u=65535&(k^=(255&e._bufferBase[o+2])<<8),f=(k^H[255&e._bufferBase[o+3]]<<5)&e._hashMask):f=255&e._bufferBase[o]^(255&e._bufferBase[o+1])<<8,n=e._hash[e.kFixHashSize+f]||0,e.HASH_ARRAY&&(s=e._hash[c]||0,i=e._hash[1024+u]||0,e._hash[c]=e._pos,e._hash[1024+u]=e._pos,s>P&&e._bufferBase[e._bufferOffset+s]==e._bufferBase[o]&&(r[v++]=l=2,r[v++]=e._pos-s-1),i>P&&e._bufferBase[e._bufferOffset+i]==e._bufferBase[o]&&(i==s&&(v-=2),r[v++]=l=3,r[v++]=e._pos-i-1,s=i),0!=v&&s==n&&(v-=2,l=1)),e._hash[e.kFixHashSize+f]=e._pos,S=1+(e._cyclicBufferPos<<1),g=e._cyclicBufferPos<<1,d=p=e.kNumHashDirectBytes,0!=e.kNumHashDirectBytes&&n>P&&e._bufferBase[e._bufferOffset+n+e.kNumHashDirectBytes]!=e._bufferBase[o+e.kNumHashDirectBytes]&&(r[v++]=l=e.kNumHashDirectBytes,r[v++]=e._pos-n-1),t=e._cutValue;;){if(n<=P||0==t--){e._son[S]=e._son[g]=0;break}if(_=((a=e._pos-n)<=e._cyclicBufferPos?e._cyclicBufferPos-a:e._cyclicBufferPos-a+e._cyclicBufferSize)<<1,B=e._bufferOffset+n,m=d<p?d:p,e._bufferBase[B+m]==e._bufferBase[o+m]){for(;++m!=h&&e._bufferBase[B+m]==e._bufferBase[o+m];);if(l<m&&(r[v++]=l=m,r[v++]=a-1,m==h)){e._son[g]=e._son[_],e._son[S]=e._son[_+1];break}}(255&e._bufferBase[B+m])<(255&e._bufferBase[o+m])?(e._son[g]=n,g=_+1,n=e._son[g],p=m):(e._son[S]=n,S=_,n=e._son[S],d=m)}return G(e),v}(e._matchFinder,e._matchDistances),e._numDistancePairs>0&&(r=e._matchDistances[e._numDistancePairs-2])==e._numFastBytes&&(r+=x(e._matchFinder,r-1,e._matchDistances[e._numDistancePairs-1],273-r)),++e._additionalOffset,r}function ce(e){e._matchFinder&&e._needReleaseMFStream&&(e._matchFinder._stream=null,e._needReleaseMFStream=0)}function ue(e){return e<2048?X[e]:e<2097152?X[e>>10]+20:X[e>>20]+40}function fe(e,r){Fe(e._choice);for(var t=0;t<r;++t)Fe(e._lowCoder[t].Models),Fe(e._midCoder[t].Models);Fe(e._highCoder.Models)}function me(e,r,t,o,n){var s,i,_,a,c;for(s=Ie[e._choice[0]>>>2],_=(i=Ie[2048-e._choice[0]>>>2])+Ie[e._choice[1]>>>2],a=i+Ie[2048-e._choice[1]>>>2],c=0,c=0;c<8;++c){if(c>=t)return;o[n+c]=s+we(e._lowCoder[r],c)}for(;c<16;++c){if(c>=t)return;o[n+c]=_+we(e._midCoder[r],c-8)}for(;c<t;++c)o[n+c]=a+we(e._highCoder,c-8-8)}function de(e,r,t,o){!function(e,r,t,o){t<8?(xe(r,e._choice,0,0),be(e._lowCoder[o],r,t)):(t-=8,xe(r,e._choice,0,1),t<8?(xe(r,e._choice,1,0),be(e._midCoder[o],r,t)):(xe(r,e._choice,1,1),be(e._highCoder,r,t-8)))}(e,r,t,o),0==--e._counters[o]&&(me(e,o,e._tableSize,e._prices,272*o),e._counters[o]=e._tableSize)}function pe(e){return function(e){e._choice=u(2),e._lowCoder=u(16),e._midCoder=u(16),e._highCoder=De({},8);for(var r=0;r<16;++r)e._lowCoder[r]=De({},3),e._midCoder[r]=De({},3)}(e),e._prices=[],e._counters=[],e}function he(e,r,t){return e._prices[272*t+r]}function Pe(e,r){for(var t=0;t<r;++t)me(e,t,e._tableSize,e._prices,272*t),e._counters[t]=e._tableSize}function le(e,r,t){return e.m_Coders[((r&e.m_PosMask)<<e.m_NumPrevBits)+((255&t)>>>8-e.m_NumPrevBits)]}function ve(e,r,t){var o,n,s=1;for(n=7;n>=0;--n)o=t>>n&1,xe(r,e.m_Encoders,s,o),s=s<<1|o}function Be(e,r,t,o){var n,s,i,_,a=1,c=1;for(s=7;s>=0;--s)n=o>>s&1,_=c,a&&(_+=1+(i=t>>s&1)<<8,a=i==n),xe(r,e.m_Encoders,_,n),c=c<<1|n}function Se(e){return e.m_Encoders=u(768),e}function ge(e,r,t,o){var n,s,i=1,_=7,a=0;if(r)for(;_>=0;--_)if(s=t>>_&1,n=o>>_&1,a+=He(e.m_Encoders[(1+s<<8)+i],n),i=i<<1|n,s!=n){--_;break}for(;_>=0;--_)n=o>>_&1,a+=He(e.m_Encoders[i],n),i=i<<1|n;return a}function ke(e){e.BackPrev=-1,e.Prev1IsChar=0}function Re(e,r){return e.NumBitLevels=r,e.Models=u(1<<r),e}function Me(e,r){var t,o=1;for(t=e.NumBitLevels;0!=t;--t)o=(o<<1)+ze(r,e.Models,o);return o-(1<<e.NumBitLevels)}function De(e,r){return e.NumBitLevels=r,e.Models=u(1<<r),e}function be(e,r,t){var o,n,s=1;for(n=e.NumBitLevels;0!=n;)o=t>>>--n&1,xe(r,e.Models,s,o),s=s<<1|o}function we(e,r){var t,o,n=1,s=0;for(o=e.NumBitLevels;0!=o;)t=r>>>--o&1,s+=He(e.Models[n],t),n=(n<<1)+t;return s}function Ee(e,r,t){var o,n,s=1;for(n=0;n<e.NumBitLevels;++n)o=1&t,xe(r,e.Models,s,o),s=s<<1|o,t>>=1}function ye(e,r){var t,o,n=1,s=0;for(o=e.NumBitLevels;0!=o;--o)t=1&r,r>>>=1,s+=He(e.Models[n],t),n=n<<1|t;return s}function Ce(e,r,t,o,n){var s,i,_=1;for(i=0;i<o;++i)xe(t,e,r+_,s=1&n),_=_<<1|s,n>>=1}function Le(e,r,t,o){var n,s,i=1,_=0;for(s=t;0!=s;--s)n=1&o,o>>>=1,_+=Ie[(2047&(e[r+i]-n^-n))>>>2],i=i<<1|n;return _}function ze(e,r,t){var o,n=r[t];return o=(e.Range>>>11)*n,(-2147483648^e.Code)<(-2147483648^o)?(e.Range=o,r[t]=n+(2048-n>>>5)<<16>>16,-16777216&e.Range||(e.Code=e.Code<<8|R(e.Stream),e.Range<<=8),0):(e.Range-=o,e.Code-=o,r[t]=n-(n>>>5)<<16>>16,-16777216&e.Range||(e.Code=e.Code<<8|R(e.Stream),e.Range<<=8),1)}function Fe(e){for(var r=e.length-1;r>=0;--r)e[r]=1024}var Ie=function(){var e,r,t,o=[];for(r=8;r>=0;--r)for(e=1<<9-r,t=1<<9-r-1;t<e;++t)o[t]=(r<<6)+(e-t<<6>>>9-r-1);return o}();function xe(e,r,t,o){var n,s=r[t];n=(e.Range>>>11)*s,o?(e.Low=f(e.Low,m(P(n),[4294967295,0])),e.Range-=n,r[t]=s-(s>>>5)<<16>>16):(e.Range=n,r[t]=s+(2048-s>>>5)<<16>>16),-16777216&e.Range||(e.Range<<=8,Ae(e))}function Ne(e,r,t){for(var o=t-1;o>=0;--o)e.Range>>>=1,1==(r>>>o&1)&&(e.Low=f(e.Low,P(e.Range))),-16777216&e.Range||(e.Range<<=8,Ae(e))}function Oe(e){return f(f(P(e._cacheSize),e._position),[4,0])}function Ae(e){var r,t=l(function(e,r){var t;return t=S(e,r&=63),e[1]<0&&(t=f(t,B([2,0],63-r))),t}(e.Low,32));if(0!=t||d(e.Low,[4278190080,0])<0){e._position=f(e._position,P(e._cacheSize)),r=e._cache;do{w(e.Stream,r+t),r=255}while(0!=--e._cacheSize);e._cache=l(e.Low)>>>24}++e._cacheSize,e.Low=B(m(e.Low,[16777215,0]),8)}function He(e,r){return Ie[(2047&(e-r^-r))>>>2]}function Ge(e){for(var r,t,o,n=0,s=0,i=e.length,_=[],a=[];n<i;++n,++s){if(128&(r=255&e[n]))if(192==(224&r)){if(n+1>=i)return e;if(128!=(192&(t=255&e[++n])))return e;a[s]=(31&r)<<6|63&t}else{if(224!=(240&r))return e;if(n+2>=i)return e;if(128!=(192&(t=255&e[++n])))return e;if(128!=(192&(o=255&e[++n])))return e;a[s]=(15&r)<<12|(63&t)<<6|63&o}else{if(!r)return e;a[s]=r}16383==s&&(_.push(String.fromCharCode.apply(String,a)),s=-1)}return s>0&&(a.length=s,_.push(String.fromCharCode.apply(String,a))),_.join("")}function We(e){var r,t,o,n=[],s=0,i=e.length;if("object"==typeof e)return e;for(function(e,r,t,o,n){var s;for(s=r;s<t;++s)o[n++]=e.charCodeAt(s)}(e,0,i,n,0),o=0;o<i;++o)(r=n[o])>=1&&r<=127?++s:s+=!r||r>=128&&r<=2047?2:3;for(t=[],s=0,o=0;o<i;++o)(r=n[o])>=1&&r<=127?t[s++]=r<<24>>24:!r||r>=128&&r<=2047?(t[s++]=(192|r>>6&31)<<24>>24,t[s++]=(128|63&r)<<24>>24):(t[s++]=(224|r>>12&15)<<24>>24,t[s++]=(128|r>>6&63)<<24>>24,t[s++]=(128|63&r)<<24>>24);return t}function Te(e){return e[1]+e[0]}var Ze=function(){var e=[{s:16,f:64,m:0},{s:20,f:64,m:0},{s:19,f:64,m:1},{s:20,f:64,m:1},{s:21,f:128,m:1},{s:22,f:128,m:1},{s:23,f:128,m:1},{s:24,f:255,m:1},{s:25,f:255,m:1}];return function(r){return e[r-1]||e[6]}}();return"undefined"==typeof onmessage||"undefined"!=typeof window&&void 0!==window.document||function(){onmessage=function(t){t&&t.data&&(t.data.action==r?LZMA.decompress(t.data.data,t.data.cbn):t.data.action==e&&LZMA.compress(t.data.data,t.data.mode,t.data.cbn))}}(),{compress:function(r,t,n,s){var i,_,a={},u=void 0===n&&void 0===s;if("function"!=typeof n&&(_=n,n=s=0),s=s||function(e){if(void 0!==_)return c(e,_)},n=n||function(r,t){if(void 0!==_)return postMessage({action:e,cbn:_,result:r,error:t})},u){for(a.c=L({},We(r),Ze(t));$(a.c.chunker););return b(a.c.output)}try{a.c=L({},We(r),Ze(t)),s(0)}catch(e){return n(null,e)}o(function e(){try{for(var r,t=(new Date).getTime();$(a.c.chunker);)if(i=Te(a.c.chunker.inBytesProcessed)/Te(a.c.length_0),(new Date).getTime()-t>200)return s(i),o(e,0),0;s(1),r=b(a.c.output),o(n.bind(null,r),0)}catch(e){n(null,e)}},0)},decompress:function(e,t,n){var s,i,_,a,u={},f=void 0===t&&void 0===n;if("function"!=typeof t&&(i=t,t=n=0),n=n||function(e){if(void 0!==i)return c(_?e:-1,i)},t=t||function(e,t){if(void 0!==i)return postMessage({action:r,cbn:i,result:e,error:t})},f){for(u.d=F({},e);$(u.d.chunker););return Ge(b(u.d.output))}try{u.d=F({},e),a=Te(u.d.length_0),_=a>-1,n(0)}catch(e){return t(null,e)}o(function e(){try{for(var r,i=0,c=(new Date).getTime();$(u.d.chunker);)if(++i%1e3==0&&(new Date).getTime()-c>200)return _&&(s=Te(u.d.chunker.decoder.nowPos64)/a,n(s)),o(e,0),0;n(1),r=Ge(b(u.d.output)),o(t.bind(null,r),0)}catch(e){t(null,e)}},0)}}}();this.LZMA=this.LZMA_WORKER=LZMA;
