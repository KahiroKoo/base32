//encode base32 in RFC 3548
var base32 = (function(){
    this.encode = encode;
    this.decode = decode;
    var charJson = {
        '0' : 'A',
        '1' : 'B',
        '2' : 'C',
        '3' : 'D',
        '4' : 'E',
        '5' : 'F',
        '6' : 'G',
        '7' : 'H',
        '8' : 'I',
        '9' : 'J',
        '10' : 'K',
        '11' : 'L',
        '12' : 'M',
        '13' : 'N',
        '14' : 'O',
        '15' : 'P',
        '16' : 'Q',
        '17' : 'R',
        '18' : 'S',
        '19' : 'T',
        '20' : 'U',
        '21' : 'V',
        '22' : 'W',
        '23' : 'X',
        '24' : 'Y',
        '25' : 'Z',
        '26' : '2',
        '27' : '3',
        '28' : '4',
        '29' : '5',
        '30' : '6',
        '31' : '7'
    }
    var keyJson = reverseJson(charJson);
    function reverseJson(jsonData){
        var newJson = {};
        for(var key in jsonData){
            newJson[jsonData[key]] = key;
        }
        return newJson;
    }
    
    function encode(input){
        if(typeof input == 'undefined' || input == null){
            return null;
        }
        var arr = input.split('');
        var aAscii2 = [];
        for(var key in arr){
            var c = arr[key];
            // console.log('c:' + c);
            var ascii = c.charCodeAt();
            // console.log('ascii:' + ascii);
            var ascii2 = ascii.toString(2);
            var gap = 8 - ascii2.length;
            var zeros = '';
            for(var i = 0; i < gap; i++){
                zeros = '0' + zeros;
            }
            ascii2 = zeros + ascii2;
            // console.log('2進位測試:' + ascii2);
            aAscii2.push(ascii2);
        }
        // console.log(aAscii2);
        var source = aAscii2.join('');
        // console.log('加密前原始字串:' + source);
        var eArr = [];
        for(var i = 0; i < source.length; i += 5){
            var s5 = source.substring(i, i + 5);
            if(s5.length < 5){
                var gap = 5 - s5.length;
                var zeros = '';
                for(var gi = 0; gi < gap; gi++){
                    zeros += '0';
                }
                s5 += zeros;
            }
            // console.log('取出的5位數字:' + s5);
            var eInt = parseInt(s5, 2)
            // console.log('轉為數字:' + eInt + ' 對應字元:' + charJson[eInt]);
            eArr.push(charJson[eInt]);
        }
        if(eArr.length % 8 != 0){
            var gap = 8 - (eArr.length % 8);
            for(var i = 0; i < gap; i++){
                eArr.push('=');
            }
        }
        var eStr = eArr.join('');
        // console.log('加密後字串' + eStr);
        return eStr;
    }

    function decode(input){
        if(typeof input == 'undefined' || input == null){
            return null;
        }
        // console.log('解密輸入來源:' + input);
        var trimStr = input.replace(/=/,'');
        var arr = trimStr.split('');
        // console.log('分解後的來源:');
        // console.log(arr);
        var noArr = [];
        for(var i = 0; i < arr.length; i++){
            var key = keyJson[arr[i]];
            // console.log('取回的key值:' + key);
            var key2 = parseInt(key).toString(2);
            if(key2.length < 5){
                var gap = 5 - key2.length;
                var zeros = '';
                for(var gi = 0; gi < gap; gi++){
                    zeros += '0';
                }
                key2 = zeros + key2;
            }
            // console.log('取回的key值(2進位):' + key2);
            noArr.push(key2);
        }
        var source = noArr.join('');
        if(source.length % 8 != 0){
            var gap = 8 - (source.length % 8);
            var zeros = '';
            for(var i = 0; i < gap; i++){
                zeros += '0';
            }
            source += zeros;
        }
        // console.log('還原前的2進位字串:' + source);
        var dArr = [];
        for(var i = 0; i < source.length; i += 8){
            var temp = source.substring(i, i+8);
            // console.log('分段的2進位8位元字串:' + temp);
            var dStr =String.fromCharCode(parseInt(temp, 2));
            // console.log('轉換為char:' + dStr);
            dArr.push(dStr);
        }
        var result = dArr.join('');
        // console.log('結果:' + result);
        return result;
    }
  return this;
})();

exports.encode = base32.encode;
exports.decode = base32.decode;