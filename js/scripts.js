var Caesar = function Caesar(s, rot) {
	var result = "";
	for (var i = 0; i < s.length; i++) {
		var c = s.charCodeAt(i);
		//uppercase letters
		if (65 <= c && c <=  90) 
			result += String.fromCharCode((c - 65 + rot) % 26 + 65);
		//lowercase letters
		else if (97 <= c && c <= 122) 
			result += String.fromCharCode((c - 97 + rot) % 26 + 97);
		else 
			//copies non-letter character
			result += s.charAt(i);
	}
	return result;
}

var Vigenere = function Vigenere(s, keystring, decode){
	if(keystring == ''){
		alert("No key entered!");
		return '';
	}
	var key = filterKey(keystring);
	if (decode) {
		for (var i = 0; i < key.length; i++)
			key[i] = (26 - key[i]) % 26;
	}
	var result = "";
	for(var i =0, j = 0 ; i<s.length; i++){
		var c = s.charCodeAt(i);
		if (65 <= c && c <=  90){
			result += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
			console.log(result);
			j++;
		}
		else if(97 <= c && c <= 122){
			result += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
		}
		else{
			result += s.charAt(i);
		}
		
	}
	return result;
}

function filterKey(key) {
	var result = [];
	for (var i = 0; i < key.length; i++) {
		var c = key.charCodeAt(i);
		if ((65 <= c && c <=  90)||(97 <= c && c <= 122))
			result.push((c - 65) % 32);
	}
	return result;
}
