const casinoCity =[]

class User {
	constructor(name,money){
		if(money>=0 && typeof(name) === 'string'){
			this.name = name;
			this.money = money;
		}else{
			console.error(`You don't have enought money or You don't write your name right!`)
		}
	}
	getCasino(){
		const casino = casinoCity.map(el => el.name)
		console.log(casino)
	}
	play(money,casinoName){
		const casino = casinoCity.find(el=>el.name === casinoName)
		if(casino.length === 0){
			console.error(`Casino with name - ${casinoName} not exist`)
		}else if(typeof(money)!=='number'){
			console.error(`You try put something else`)
		}else if(money < 0){
			console.error(`You need put positive number`)
		}else if(this.money <= money){
			console.error(`You don't have enought money to play`)
		}else{
			let result =0
			for(let i =0;i<casino.getMatchineCount;i++){
				if(casino.gameMachine[i].getMoney+money > money*3){
					result = casino.gameMachine[i].playGame(money)
					this.money += result
					break
				}
			}
			if(result === 0){
				console.error(`This casino machine don't have money. Please try again with less money`);
			}
		}
	}
}

class SuperAdmin extends User {
	constructor(name,money){
		super(name,money)
		this.casinoArr = []
	}
	createCasino(name){
		if(this.casinoArr.some(el => el.name === name)){
			console.error(`Casino is alredy exist`)
		}else{
			const casino = new Casino(name)
			this.casinoArr.push(casino)
			casinoCity.push(casino)
		}
	}
	createGameMachine(money,nameCasino){
		const casino = this.casinoArr.find(el=>el.name === nameCasino)
		if(casino === undefined){
			console.error(`You need create casino first`)
		}else if(casino.length === 0){
			console.error(`Casino with name - ${nameCasino} not exist`)
		}else if(typeof(money)!=='number'){
			console.error(`You try put something else`)
		}else if(money < 0){
			console.error(`You need put positive number`)
		}else if(casino.money - money < 0){
			console.error(`You don't have enought money to put current size`)
		}else{
			const gameMachine = new GameMachine(money)
			casino.money -= money
			casino.gameMachine.push(gameMachine)
		}
	}
	getMoneyFromCasino(money,nameCasino){
		const casino = this.casinoArr.find(el=>el.name === nameCasino)
		if(casino === undefined){
			console.error(`You need create casino first`)
		}else if(casino.length === 0){
			console.error(`Casino with name - ${nameCasino} not exist`)
		}else if(typeof(money)!=='number'){
			console.error(`You try get something else`)
		}else if(casino.getMoney < money){
			console.error(`You want to get more money that exist`)
		}else{
			const machines = casino.gameMachine.sort((a,b)=> a.money -  b.money).reverse()
			for(let i = 0; i < casino.getMatchineCount;i++){
				if(money > machines[i].money){
					this.money += money
					machines[i].money -= money
					money = 0 
					break
				}else{
					money -= machines[i].money
					this.money += machines[i].money
					machines[i].money = 0
				}
			}
			if(money !== 0){
				casino.money -= money
				this.money += money
			}
		}
	}
	setMoneyToCasino(money,nameCasino){
		const casino = this.casinoArr.find(el=>el.name === nameCasino)
		if(casino === undefined){
			console.error(`You need create casino first`)
		}else if(casino.length === 0){
			console.error(`Casino with name - ${nameCasino} not exist`)
		}else if(typeof(money)!=='number'){
			console.error(`You try put something else`)
		}else if(money < 0){
			console.error(`You need put positive number`)
		}else if(this.money - money < 0){
			console.error(`You don't have enought money to put current size`)
		}else{
			this.money -= money
			casino.money += money
		}
	}
	setMoneyToGameMachine(money,nameCasino,numberMachine){
		const casino = this.casinoArr.find(el=>el.name === nameCasino)
		
		if(casino === undefined){
			return console.error(`You need create casino first`)
		}else if(casino.length === 0){
			return console.error(`Casino with name - ${nameCasino} not exist`)
		}
		
		const gameMachine = casino.gameMachine[(numberMachine-1)]

		if(gameMachine == undefined){
			return console.error(`GameMachine with number - ${numberMachine} not exist`)
		}else if(typeof(money)!=='number'){
			return console.error(`You try put something else`)
		}else if(money < 0){
			return console.error(`You need put positive number`)
		}else if(casino.money - money < 0){
			return console.error(`You don't have enought money to put current size`)
		}

		casino.money -= money
		gameMachine.putMoney(money)
		
	}
	deleteGameMachineByNumber(nameCasino,numberMachine){
		const casino = this.casinoArr.find(el=>el.name === nameCasino)
		if(casino === undefined){
			return console.error(`You need create casino first`)
		}else if(casino.length === 0){
			return console.error(`Casino with name - ${nameCasino} not exist`)
		}
		const gameMachine = casino.gameMachine[(numberMachine-1)]
		
		if(gameMachine == undefined){
			return console.error(`GameMachine with number - ${numberMachine} not exist`)
		}

		let moneyFromMachine = gameMachine.getMoney
		casino.gameMachine = casino.gameMachine.filter((el,i)=>i!==numberMachine)
		if(casino.gameMachine.length === 0){
			casino.money += moneyFromMachine
		}else{
			let moneyToEachMachine = Math.floor(moneyFromMachine/casino.gameMachine.length)
			casino.gameMachine.forEach(el=>{
				el.putMoney(moneyToEachMachine)
			})
		}	
		
	}
}

class Casino {
	constructor(name){
		this.name = name
		this.money = 0
		this.gameMachine = []
	}

	get getMoney(){
		let matchineMoney = this.gameMachine.reduce((a,b)=>a.getMoney+b.getMoney)
		return this.money + matchineMoney.money
	}

	get getMatchineCount(){
		return this.gameMachine.length
	}
}

class GameMachine {
	constructor(money){
		this.money = money
	}
	get getMoney(){
		return this.money
	}
	getMoneyFromMachine(number){
		this.money -= number
		return number
	}
	putMoney(money){
		this.money += money
	}
	playGame(money){
		const randomNumber = Math.floor(Math.random() * (1000 - 100) + 100);
		const winNumbers = [...new Set(randomNumber.toString() )];
		this.putMoney(money);
		if (winNumbers.length === 2) {
			const prize = money * 2;
			this.getMoneyFromMachine(prize);
			console.log(`Number is ${randomNumber}. You won ${prize}`);

			return prize;
		} else if (winNumbers.length === 1) {
			const prize = money * 3;
			this.getMoneyFromMachine(prize);
			console.log(`Number is ${randomNumber}. You won ${prize}`);

			return prize;
		} else {
			console.log(`Number is ${randomNumber}. You didn't win.`);

			return -money;
		}
	}
}

const admin = new SuperAdmin('Admin1',50000)
admin.createCasino('CasinoA1')
admin.setMoneyToCasino(30000,'CasinoA1')
admin.createGameMachine(10000,'CasinoA1')
admin.setMoneyToGameMachine(10000,'CasinoA1',1)
admin.createGameMachine(4000,'CasinoA1')
admin.setMoneyToGameMachine(4000,'CasinoA1',2)

const user = new User('User1',5000)
user.getCasino()
user.play(2000,'CasinoA1')
user.play(2000,'CasinoA1')
user.play(2000,'CasinoA1')
user.play(200,'CasinoA1')

const user2 = new User('User2',500000)
user2.getCasino()
user2.play(4000,'CasinoA1')
user2.play(4000,'CasinoA1')
user2.play(4000,'CasinoA1')
user2.play(400,'CasinoA1')
user2.play(40000,'CasinoA1')
user2.play(5000,'CasinoA1')
user2.play(4000,'CasinoA1')
user2.play(400,'CasinoA1')

const user3 = new User('User2',10000)
user3.getCasino()
user3.play(2000,'CasinoA1')
user3.play(2000,'CasinoA1')
user3.play(2000,'CasinoA1')
user3.play(200,'CasinoA1')

console.log('---------admin2-------------')
const admin2 = new SuperAdmin('Admin2',50000)
admin2.createCasino('CasinoA1')
admin2.createCasino('CasinoA1')
admin2.setMoneyToCasino(30000,'CasinoA2')
admin2.setMoneyToCasino(-30000,'CasinoA2')
admin2.setMoneyToCasino(30000,'CasinoA1')
admin2.createGameMachine(10000,'CasinoA2')
admin2.createGameMachine(-10000,'CasinoA1')
admin2.createGameMachine(10000,'CasinoA1')
admin2.setMoneyToGameMachine(10000,'CasinoA2',1)
admin2.setMoneyToGameMachine(10000,'CasinoA1',3)
admin2.setMoneyToGameMachine(-10000,'CasinoA1',1)
admin2.setMoneyToGameMachine(10000,'CasinoA1',1)

console.log('---------admin3-------------')
const admin3 = new SuperAdmin('Admin3',50000)
admin3.createCasino('CasinoA1')
admin3.setMoneyToCasino(30000,'CasinoA1')
admin3.createGameMachine(10000,'CasinoA1')
admin3.setMoneyToGameMachine(10000,'CasinoA1',1)
admin3.createGameMachine(4000,'CasinoA1')
admin3.setMoneyToGameMachine(4000,'CasinoA1',2)
admin3.deleteGameMachineByNumber('CasinoA1',4)
admin3.deleteGameMachineByNumber('CasinoA1',1)
admin3.getMoneyFromCasino(15000,'CasinoA1')
admin3.getMoneyFromCasino(1500000,'CasinoA1')