	const resources = [
	'../resources/cb.png', '../resources/co.png',
	'../resources/sb.png', '../resources/so.png',
	'../resources/tb.png', '../resources/to.png'
	];
	const back = '../resources/back.png';
	const StateCard = Object.freeze({
	DISABLE: 0,
	ENABLE: 1,
	DONE: 2
	});


	var game = {
	items: [],
	states: [],
	setValue: null,
	ready: 0,
	lastCard: null,
	selected: [],
	score: 200,
	pairs: 2,
	selection: 2,
	mode: 'normal',
	difficulty: 'normal',
	level: 1,
	maxTime: 2000,
	penalty: 25,
	remainingGroups: 0,
	goBack: function(idx){
	if (this.setValue && this.setValue[idx]) {
		this.setValue[idx](back);
	}
		this.states[idx] = StateCard.ENABLE;
	},
	goFront: function(idx){
	if (this.setValue && this.setValue[idx]) {
		this.setValue[idx](this.items[idx]);
	}
		this.states[idx] = StateCard.DISABLE;
	},
	select: function(){
		let savedOptions = JSON.parse(localStorage.getItem('options')) || {};
		this.mode = savedOptions.mode || 'normal';
		this.selection = savedOptions.selection || 2;
		this.difficulty = savedOptions.difficulty || 'normal';
		this.applyDifficulty();
		if (this.mode === 'infinite') {
			this.level = 1;
			this.score = 200;
			sessionStorage.removeItem('load');
		}
		if (sessionStorage.load && this.mode !== 'infinite') {
			let toLoad = JSON.parse(sessionStorage.load);
			this.items = toLoad.items;
			this.states = toLoad.states;
			this.score = toLoad.score;
			this.pairs = toLoad.pairs;
			this.level = toLoad.level || 1;
		} else {
			this.createLevel();
		}
	},
	createLevel: function(){
		let base = resources.slice(0, this.pairs);
		let temp = [];
		for (let i = 0; i < this.selection; i++) {
			temp = temp.concat(base);
		}
		shuffe(temp);
		this.items = temp;
		this.states = temp.map(() => StateCard.ENABLE);
		this.remainingGroups = base.length;
		this.selected = [];
		this.lastCard = null;
		this.ready = 0;
	},
	start: function(){
		this.ready = this.items.length;
		this.gameLocked = true;
		for (let i = 0; i < this.items.length; i++) {
			let el = document.getElementById(String(i));
			if (el) el.src = this.items[i];
		}
		setTimeout(() => {
			let i = 0;
			let interval = setInterval(() => {
				let el = document.getElementById(String(i));
				if (el) el.src = back;
				this.states[i] = StateCard.ENABLE;
				i++;
				if (i >= this.items.length) {
					clearInterval(interval);
					this.gameLocked = false;
				}
			}, 120);
		}, 2000);
	},
	click: function(indx){
		if (this.states[indx] !== StateCard.ENABLE || this.ready < this.items.length) return;
		this.goFront(indx);
		this.selected.push(indx);
		if (this.selected.length === this.selection) {
			let firstValue = this.items[this.selected[0]];
			let allEqual = this.selected.every(i => this.items[i] === firstValue);
			if (allEqual) {
				this.selected.forEach(i => {
					this.states[i] = StateCard.DONE;
				});
				this.remainingGroups--;
				if (this.remainingGroups <= 0) {
					if (this.mode === 'infinite') {
						this.nextLevel();
					} else {
						alert(`Has guanyat amb ${this.score} punts!!!!`);
						window.location.assign("../");
					}
				}
			} else {
				this.selected.forEach(i => this.goBack(i));
				this.score -= this.penalty;
				if (this.score <= 0) {
					alert("Has perdut");
					window.location.assign("../");
				}
			}
			this.selected = [];
		}
	},
	nextLevel: function(){
		this.level++;
		this.pairs++;
		this.penalty += 5;
		this.maxTime = Math.max(500, this.maxTime - 200);
		this.selected = [];
		this.lastCard = null;
		this.createLevel();
		this.start();
		alert("Nivell " + this.level);
	},
	save: function(){
		let to_save = JSON.stringify({
			items: this.items,
			states: this.states,
			score: this.score,
			pairs: this.pairs,
			level: this.level,
			mode: this.mode,
			selection: this.selection
		});
		fetch('../php/save.php', {
			method: "POST",
			body: to_save,
			headers: {"Content-type": "application/json; charset=UTF-8"}
		})
		.catch(err => console.error(err));
		localStorage.save = to_save;
		window.location.assign("../");
	},
	applyDifficulty: function () {
		if (this.difficulty === 'easy') {
			this.maxTime = 3000;
			this.penalty = 10;
			this.pairs = 2;
		}
		if (this.difficulty === 'normal') {
			this.maxTime = 2000;
			this.penalty = 25;
			this.pairs = 3;
		}
		if (this.difficulty === 'hard') {
			this.maxTime = 1200;
			this.penalty = 40;
			this.pairs = 4;
		}
	}
};
function shuffe(arr){
arr.sort(() => Math.random() - 0.5);
}
export var gameItems;
export function selectCards(){
game.select();
gameItems = game.items;
}
export function clickCard(indx){
game.click(indx);
}
export function startGame(){
game.start();
}
export function initCard(callback){
if (!game.setValue) game.setValue = [];
game.setValue.push(callback);
}
export function saveGame(){
game.save();
}