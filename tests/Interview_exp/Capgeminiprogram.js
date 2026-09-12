	// your code goes here
		//String[] product={"milk","bread","eggs","milk","cheege"};
		
	//	output={milk,milk,bread,eggs,cheege}

    let product = ["milk","bread","eggs","milk","cheege"];

	let result =[];

	let map = new Map();

	for(let ss of product){
		map.set(ss,(map.get(ss)||0)+1);
	}

	// duplicate:
	for(let item of product){
		if(map.get(item)>1){
			result.push(item);
		}
	}

	// add unique:
	for(let item of product){
		if(map.get(item)===1){
			result.push(item);
		}
	}

	console.log(result);