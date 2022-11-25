var i = 0;
var j = 0;
var contain;
var tabPlus;
var tab;
var tabClose;

class Desktop {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor() {		// 객체를 만들 때 바로 실행해줄라고 사용하는 메서드 집어넣음
		this.createContainer();
		this.drag();
		this.clear();
	}


	/** 컨테이너 생성 */
	createContainer() {
		contain = document.createElement('div');
		contain.setAttribute('class', 'container');
		contain.setAttribute('id' , 'contain' + j);
		desktop1.appendChild(contain);
	};



	/** 드래그 */
	drag() {
		window.addEventListener('load', function () {				// 모든 게 불러와졌을 때 발생
			var container = document.querySelector('.container');
			var dragging = false;
			var offset = { x: 0, y: 0 };
			var current = null;
			var left = container.offsetLeft;
			var top = container.offsetTop;

			document.addEventListener('mousedown', function (e) {	// 마우스를 눌렀을 때  	
				if (e.target.classList.contains('foldIcon') || e.target.classList.contains('modal')) {
					e.preventDefault();
					dragging = true;
					current = e.target; 							// 마우스 다운 해서 현재 클릭된 녀석
					offset.x = e.offsetX;
					offset.y = e.offsetY;
				}
			});
			document.addEventListener('mousemove', function (e) {	// 움직이는 동안
				// console.log(dragging)
				if (!dragging) return;
				if (e.target.classList.contains('foldIcon')) {
					current.style.left = e.pageX - offset.x - current.dataset.left + 'px';
					current.style.top = e.pageY - offset.y - current.dataset.top - 5 + 'px';
				} else {
					current.style.left = e.pageX - offset.x - left + 'px';
					current.style.top = e.pageY - offset.y - top + 'px';
				}
			});
			document.addEventListener('mouseup', function (e) {     // 마우스를 땠을 때
				dragging = false;
			});
		});
	};

	/** 초기화 */
	clear() {
		document.querySelector('.clearBtn').addEventListener('click', function () {
			contain.innerHTML = '';
		});
	};
};



class Folder {
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor() {
		this.folderMake();
	}
	/** 폴더 생성 */
	folderMake() {
		i = 0;
		document.querySelector('.folderBtn').addEventListener('click', function () {
			console.log('클릭 잘 돼?')
			// ********************폴더 html S ********************
			var newFolder = document.createElement('img');
			i++;
			newFolder.setAttribute('src', 'img/maplefolder.png');
			newFolder.setAttribute('class', 'foldIcon');
			newFolder.classList.add('fold');
			newFolder.setAttribute('alt', 'folder' + i);
			contain.appendChild(newFolder);
			newFolder.onload = function () {
				newFolder.dataset.left = newFolder.offsetLeft;
				newFolder.dataset.top = newFolder.offsetTop;
			};

			/** 폴더 만들면서 모달도 같이 생성 */
			var modal = document.createElement('div');
			modal.setAttribute('class', 'foldIcon');
			modal.setAttribute('class', 'modal');
			contain.appendChild(modal);

			var modalheader = document.createElement('div');
			modalheader.setAttribute('class', 'modalheader');
			modal.appendChild(modalheader);
			modalheader.innerText = newFolder.getAttribute('alt');

			var modalclose = document.createElement('span');
			modalclose.setAttribute('class', 'modalclose');
			modalclose.innerText = 'X';
			modalheader.appendChild(modalclose);

			/** 모달 기능 부르기 */
			new Modal();
		});
	};
};





class Icon {
	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor() {
		this.icon();
	}
	/** 아이콘 생성 */
	icon() {
		document.querySelector('.iconBtn').addEventListener('click', function () {
			// 랜덤 아이콘
			var iconImages = ['maple1.png', 'maple1.png', 'maple2.png', 'maple3.png', 'maple4.png', 'maple5.png', 'maple6.png'];
			var iconRandom = Math.floor(Math.random() * iconImages.length);
			var newIcon = document.createElement('img');
			newIcon.setAttribute('src', 'img/' + iconImages[iconRandom]);
			newIcon.setAttribute('class', 'foldIcon');
			contain.appendChild(newIcon);
			newIcon.onload = function () {
				newIcon.dataset.left = newIcon.offsetLeft;
				newIcon.dataset.top = newIcon.offsetTop;
			};
		});
	};
};





class Modal {
	/* TODO: Modal 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor() {
		this.modal();
	}
	/** 모달 기능 */
	modal() {
		document.querySelectorAll('.fold').forEach(function (folderdb) {
			document.querySelectorAll('.modal').forEach(function (modal) {

				var closeBtn = modal.querySelector(".modalclose");

				/** 모달 열기 */
				function modalOn() {
					modal.style.display = 'flex';
				};

				/** 모달 닫기 */
				function modalOff() {
					modal.style.display = 'none';
				};

				/** 폴더 더블 클릭시 모달 열기 */
				folderdb.addEventListener('dblclick', function () {
					var modalhead = modal.querySelector('.modalheader').innerText;
					console.log(this.getAttribute('alt'));
					if (modalhead.slice(0, -1) === this.getAttribute('alt')) {
						modalOn();
					}
				});

				/** 모달 클릭시 닫기 */
				closeBtn.addEventListener("click", function () {
					modalOff();
				});
			});
		});
	};
};





class Tab {
	constructor() {
		this.createTab();
		this.createBtn();
	}
	/** 탭 생성 */
	createTab() {
		tab = document.createElement('div');
		tab.setAttribute('class', 'tab');
		desktop1.append(tab);

		var tab1 = document.createElement('button');
		tab1.setAttribute('class', 'tabs');
		tab1.setAttribute('id', 'contain0');
		tab1.innerText = '기본화면';
		tab.appendChild(tab1);

		tabPlus = document.createElement('button');
		tabPlus.setAttribute('class', 'tabPlus');
		tabPlus.innerText = '➕';
		tab.appendChild(tabPlus);


		tabPlus.addEventListener('click', function () {
			j++;
			var tab1 = document.createElement('button');
			tab1.setAttribute('class', 'tabs');
			tab1.setAttribute('id', 'contain' + j);
			tab1.innerText = '탭입니당' + j;
			tab.appendChild(tab1);


			tabClose = document.createElement('span');
			tabClose.setAttribute('class', 'tabClose');
			tabClose.innerText = 'x';
			tab1.appendChild(tabClose);


			/** 탭 생성시 컨테이너 공간도 같이 생성 */
			new Desktop();

			/** 생성된 컨테이너 기본 디스플레이 값 none 주기 */
			contain.style.display = 'none';
			
			/** 탭 버튼 id값과 컨테이너 id값이 같다면 display 보여주기 다르다면 안 보여주기 */
			document.querySelectorAll('.container').forEach(function(containSelect){
				document.querySelectorAll('.tabs').forEach(function(tabsSelect){
					tabsSelect.addEventListener('click', function(){
						if(this.getAttribute('id')===containSelect.getAttribute('id')){
							containSelect.style.display = 'inline';
						}else{
							containSelect.style.display = 'none';
						}
					});
				});
			});

			// 탭 닫기 버튼
			tabClose.addEventListener('click', function () {
				tab1.remove();
			});

			tab1.addEventListener('mouseover', function () {
				this.style.color = 'white';
			});
			tab1.addEventListener('mouseout', function () {
				this.style.color = 'black';
			});
		});
	};

	/** 폴더 아이콘 초기화 버튼 생성 */
	createBtn() {
		var btn = document.createElement('div');
		btn.setAttribute('class', 'btn');
		desktop1.appendChild(btn);

		var newFoldBtn = document.createElement('button');
		newFoldBtn.setAttribute('class', 'folderBtn');
		newFoldBtn.innerText = '폴더 생성';
		btn.appendChild(newFoldBtn);

		var newIconBtn = document.createElement('button');
		newIconBtn.setAttribute('class', 'iconBtn');
		newIconBtn.innerText = '아이콘 생성';
		btn.appendChild(newIconBtn);

		var newClearBtn = document.createElement('button');
		newClearBtn.setAttribute('class', 'clearBtn');
		newClearBtn.innerText = '초기화';
		btn.appendChild(newClearBtn);
	};
};


/**
웹 상에서 동작하는 간단한 바탕화면 시스템을 만들 예정입니다.
요구사항은 다음과 같습니다.
아이콘은 폴더와 일반 아이콘, 두 가지의 종류가 있습니다.
아이콘들을 드래그를 통해 움직일 수 있어야 합니다.
폴더 아이콘은 더블클릭하면 해당 폴더가 창으로 열리며, 열린 폴더의 창 역시 드래그를 통해 움직일 수 있어야 합니다.
바탕화면의 생성자를 통해 처음에 생겨날 아이콘과 폴더의 개수를 받을 수 있습니다.
여러 개의 바탕화면을 각각 다른 DOM 엘리먼트에서 동시에 운영할 수 있습니다.
Drag & Drop API를 사용하지 말고, 실제 마우스 이벤트(mouseover, mousedown, mouseout 등)를 사용하여 구현해 보세요!
객체 리터럴?
 */


// 왠지 그 뭐지 그... 음... 맞아 폴더랑 아이콘 생성할 때도 foreach로 컨테이너가 flex일 때 사용될 수 있도록 하면 될 거 같음