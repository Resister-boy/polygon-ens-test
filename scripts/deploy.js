const main = async () => {
	const domainContractFactory = await hre.ethers.getContractFactory('Domains');
	const domainContract = await domainContractFactory.deploy("resistance");
	await domainContract.deployed();
	
	console.log("Contract deployed to: ", domainContract.address);
	
	// 도메인 이름을 변경해봅니다. 
	let txn = await domainContract.register("eth", {value: hre.ethers.utils.parseEther('0.01')});
	await txn.wait();
	console.log("Minted domain resistance.eth");
	
	txn = await domainContract.setRecord("resister-boy", "Am I a resistance or a resister-boy??");
	await txn.wait();
	console.log("Set record for resistance.eth");

	const address = await domainContract.getAddress("resister-boy");
	console.log("Onwer of domain resistance:", address);
	
	const balance = await hre.ethers.provider.getBalance(domainContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async() => {
	try {
		await main();
		process.exit(0);
	}catch(error){
		console.log(error);
		process.exit(1);
	}
};

runMain();