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

function reverseKey(key){
	var result ="";
	for(var i =0; i<key.length; i++){
		result += String.fromCharCode(key[i]+65);
		result += " ";
	}
	return result;
}
function toMatrix(string, isTrigraph){
	var rows = 2;
	var stringArray = [];
	var position = 0;
	if(isTrigraph == false){
		if(string.length % 2 == 1){
		string.push(0);
		}
		for(var i = 0; i< (string.length)/2; i++){
			var cell = new Array(2);
			stringArray.push(cell);
			for(var j = 0; j< 2; j++){
				stringArray[i][j]= string[position++];
			}
		}
	}
	else{
		if(string.length % 3 != 0){
			var toAdd = 3- (string.length % 3);
			for(var n = 0; n< toAdd; n++){
				string.push(23);
			}
		}
		for(var i =0; i< (string.length)/3; i++){
			var cell = new Array(3);
			stringArray.push(cell);
			for(var j =0; j < 3; j++){
				stringArray[i][j]= string[position++];
			}
		}
	}
	return stringArray;	
}
function invertKeyMatrix(matrix, isTrigraph){
	var det =0;
	var multInv;
	if(isTrigraph == false){
		det = matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0];
		while (det <0)
			det+=26;
		det = det%26;
		multInv =0;
		for(multInv =0; multInv<=100;multInv++){
			if((det*multInv)%26 == 1)
				{
					break;
				}
		}
		if((det*multInv)%26 != 1)
			alert("The matrix cannot be used for deciphering");
		
		var temp = matrix[0][0];
		matrix[0][0]= matrix[1][1]*multInv;
		matrix[1][1]= temp*multInv;
		matrix[0][1] *=(-1);
		while(matrix[0][1] < 0)
			matrix[0][1] +=26;
		matrix[0][1] = (matrix[0][1]*multInv)%26;
		matrix[1][0] *=(-1);
		while(matrix[1][0] < 0)
			matrix[1][0] +=26;
		matrix[1][0] = (matrix[1][0]*multInv)%26;
		
	}else{
		det = matrix[0][0]*(matrix[1][1]*matrix[2][2] - matrix[2][1]*matrix[1][2]) - matrix[1][0]*(matrix[0][1]*matrix[2][2] - matrix[2][1]*matrix[0][2]) 
			+ matrix[2][0]*(matrix[0][1]*matrix[1][2] - matrix[1][1]*matrix[0][2]);
		while (det <0)
			det+=26;
		det = det % 26;
		multInv =0;
		for(multInv =0; multInv<=200;multInv++){
			if((det*multInv)%26 == 1)
				{
					break;
				}
		}
		if((det*multInv)%26 != 1)
			alert("The matrix cannot be used for deciphering");
		
		matrix = adjMatrix(matrix);
		for(var i = 0;i < 3;i++){
			for(var j = 0;j < 3;j++){
				matrix[i][j] = (matrix[i][j]*multInv) % 26;
			}
		}
		
	}
	return matrix;
}

function adjMatrix(matrix){
	var result = [];
	var cell = new Array(3);
	cell[0]=(matrix[1][1]*matrix[2][2])-(matrix[2][1]*matrix[1][2]);
	cell[1]=(-1)*((matrix[0][1]*matrix[2][2])-(matrix[2][1]*matrix[0][2]));
	cell[2]=(matrix[0][1]*matrix[1][2])-(matrix[1][1]*matrix[0][2]);
	result.push(cell);
	var cell2 = new Array(3);
	cell2[0]=(-1)*((matrix[1][0]*matrix[2][2])-(matrix[2][0]*matrix[1][2]));
	cell2[1]=(matrix[0][0]*matrix[2][2])-(matrix[2][0]*matrix[0][2]);
	cell2[2]=(-1)*((matrix[0][0]*matrix[1][2])-(matrix[1][0]*matrix[0][2]));
	result.push(cell2);
	
	var cell3 = new Array(3);
	cell3[0]=(matrix[1][0]*matrix[2][1])-(matrix[2][0]*matrix[1][1]);
	cell3[1]=(-1)*((matrix[0][0]*matrix[2][1])-(matrix[2][0]*matrix[0][1]));
	cell3[2]=(matrix[0][0]*matrix[1][1])-(matrix[1][0]*matrix[0][1]);
	result.push(cell3);
	
	for(var i = 0;i < 3;i++){
		for(var j = 0;j < 3;j++){
			console.log(result[i][j]);
			while(result[i][j] <0)
				result[i][j]+=26;
			result[i][j] = result[i][j] % 26;
		}
	}
	return result;
}

function keyToMatrix(key, isTrigraph, invert){
	var keyArray = [];
	var spareLetter = 0;
	if(isTrigraph == false){
		var cell = new Array(2);
		var cell2 = new Array(2);
		cell[0] = key[0];
		if(key.length >1)
			cell2[0] = key[1];
		else
			cell2[0] = spareLetter++;
		if(key.length >2)	
			cell[1] = key[2];
		else
			cell[1] = spareLetter++;
		if(key.length >3)
			cell2[1] = key[3];
		else
			cell2[1] = spareLetter++;
		keyArray.push(cell);
		keyArray.push(cell2);
	}
	else{
		var cell = new Array(3);
		cell[0] = key[0];
		cell[1] = key[3];
		if(key.length > 6)
			cell[2] = key[6];
		else
			cell[2] = spareLetter++;
		keyArray.push(cell);
		
		var cell2 = new Array(3);
		cell2[0] = key[1];
		cell2[1] = key[4];
		if(key.length > 7)
			cell2[2] = key[7];
		else
			cell2[2] = spareLetter++;
		keyArray.push(cell2);
		
		var cell3 = new Array(3);
		cell3[0] = key[2];
		cell3[1] = key[5];
		if(key.length > 8)
			cell3[2] = key[8];
		else
			cell3[2] = spareLetter++;
		keyArray.push(cell3);
	}
	if(invert){
		keyArray = invertKeyMatrix(keyArray,isTrigraph);
	}
		
	return keyArray;
}

var Hill = function Hill(s,keystring,decode){
	var result= [];
	var isTrigraph = true;
	if(keystring == ''){
		alert("No key entered!");
		return '';
	}
	var key = filterKey(keystring);
	if(key.length < 6){
		console.log("bigraph mode");
		isTrigraph = false;
	}
	var keyArray = keyToMatrix(key, isTrigraph, decode);
	var stringCodes = filterKey(s);
	var stringArray = toMatrix(stringCodes, isTrigraph);
	var mathResult = 0;
	for(var i = 0; i< stringArray.length; i++){
		mathResult = (keyArray[0][0]*stringArray[i][0]) + (keyArray[1][0]*stringArray[i][1]);
		if(isTrigraph)
			mathResult += keyArray[2][0]*stringArray[i][2];
		result.push(mathResult %26);
		mathResult = (keyArray[0][1]*stringArray[i][0]) + (keyArray[1][1]*stringArray[i][1]);
		if(isTrigraph)
			mathResult += keyArray[2][1]*stringArray[i][2];
		result.push(mathResult %26);
		if(isTrigraph){
			mathResult = (keyArray[0][2]*stringArray[i][0]) + (keyArray[1][2]*stringArray[i][1]) + (keyArray[2][2]*stringArray[i][2]);
			result.push(mathResult %26);
		}
			
	}
	//checks if the matrix can be inverted, can't decode otherwise
	if(!decode)
		invertKeyMatrix(keyArray,isTrigraph);
	return reverseKey(result);
	
	
}
