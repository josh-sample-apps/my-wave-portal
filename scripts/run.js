const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
      });
    await waveContract.deployed();
  
    console.log("WaveContract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
  
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
  
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();
  
    waveCount = await waveContract.getTotalWaves();

    /*
    * Get Contract balance
    */
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let result = await waveContract.connect(randomPerson).love("Another message!");
    //result = await loveTxn.wait();
    console.log("Won ?", result); // Wait for the transaction to be mined

    sleep(35000); 
    result = await waveContract.connect(randomPerson).love("Another message again!");
    //result = await loveTxn.wait();
    console.log("Won ?", result);
    // Wait for the transaction to be mined

    let allLoves = await waveContract.getAllLoves();
    console.log(allLoves);

    /*
    * Get Contract balance
    */
    contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
  runMain();