### edbase32
edbase32 is the RFC 3548 base32 encoding and decoding tool. 

### Install
```
npm install edbase32
```

### Usage
```
var base32 = require('edbase32');
var s = 'abc';
console.log('source:' + s);
//source:abc
var es = base32.encode(s);
console.log('encoded string:' + es);
//encoded string:MFRGG===
var ds = base32.decode(es);
console.log('decoded string:' + ds);
//decoded string:abc
```

### License
This library is licensed under MIT.
