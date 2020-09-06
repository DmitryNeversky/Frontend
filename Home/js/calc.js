let total = 0,
	tabLeft = document.querySelector('.tab-left'),
	tabRight = document.querySelector('.tab-right'),
	blocksBlock = document.getElementById('blocks-block'),
	pagesBlock = document.getElementById('pages-block'),
	counterBlock = document.getElementById('counter-block'),
	counterPages = document.getElementById('counter-pages'),
	counterHours = document.getElementById('counter-hours'),
	changesCheck = document.getElementById('changes-check'),
	cmsCheck = document.getElementById('changes-cms'),
	totalValue = document.getElementsByClassName('total-count')[0], //??
	input = document.getElementsByTagName('input');
	var x = 0, y = 0, a = 0, b = 0, c = 1, e = 0, f = 0, g = 0, h = 0, cms_checked = 0, check_checked = 0;

const land = 2550,
	  corp = 8000,
	  cms = 1500,
	  changes = 1000,
	  blocks = 500,
	  pages = 2000,
	  time = -100;

window.addEventListener('DOMContentLoaded', function() {

	tabLeft.addEventListener('click', () => {
			c=1;
			b=0;

			for(let i = 0; i < input.length; i++){
				input[i].value = '';
			};


			total = land;
			x=0;
			totalValue.value = total;

			blocksBlock.style.display = 'flex';
			pagesBlock.style.display = 'none';

			tabLeft.classList.add('active');
			tabRight.classList.remove('active');

			if(changesCheck.checked){
				changesCheck.checked = false;
			};
			if(cmsCheck.checked){
				cmsCheck.checked = false;
			};

	});

		tabRight.addEventListener('click', () => {
			b=1;
			c=0;

			for(let i = 0; i < input.length; i++){ //Чистка при переходе
				input[i].value = '';
			};

			total = corp;
			x=1;
			totalValue.value = total;

			blocksBlock.style.display = 'none';
			pagesBlock.style.display = 'flex';
			
			tabRight.classList.add('active');
			tabLeft.classList.remove('active');

			if(changesCheck.checked){
				changesCheck.checked = false;
			};
			if(cmsCheck.checked){
				cmsCheck.checked = false;
			};

	});

	counterBlock.addEventListener('change' , () => { //Как только инпут изменится сработает это событие
		counterHours.value = '';
		if(changesCheck.checked){
				changesCheck.checked = false;
			};
			if(cmsCheck.checked){
				cmsCheck.checked = false;
			};
		total = counterBlock.value * blocks;
		total += land;
		total += a;
		totalValue.value = total;
		x=total;
		x+=a;
	});

	counterPages.addEventListener('change' , () => { //Как только инпут изменится сработает это событие
		if(changesCheck.checked){
				changesCheck.checked = false;
			};
			if(cmsCheck.checked){
				cmsCheck.checked = false;
			};
		total = counterPages.value * pages;
		total += corp;
		totalValue.value = total;
		y=total;
	});

	counterHours.addEventListener('change', () => {
		if(changesCheck.checked){
				changesCheck.checked = false;
			};
			if(cmsCheck.checked){
				cmsCheck.checked = false;
			};
			total = counterHours.value * time;
			a = total;
			total += x;
			totalValue.value = total;
	});

		changesCheck.addEventListener('change', () => {
			if(changesCheck.checked){
				check_checked = 1;
				if (c == 1) {
					total = changes;
					if (cms_checked == 1) total += cms;
					total += x;
					total += a;
					totalValue.value = total;
				}
				if (b == 1) {
					total = changes;
					if (cms_checked == 1) total += cms;
					total += y;
					total += a;
					totalValue.value = total;
				}
			} else {
				check_checked = 0;
				if (c == 1) {
					total = 0;
					if (cms_checked == 1) total += cms;
					total += x;
					total += a;
					totalValue.value = total;
				}
				if (b == 1) {
					total = 0;
					if (cms_checked == 1) total += cms;
					total += y;
					total += a;
					totalValue.value = total;
				}
			}
		});

		cmsCheck.addEventListener('change', () => {
			if(cmsCheck.checked){
				cms_checked = 1;
				if (c == 1) {
					total = cms;
					if (check_checked == 1) total += changes;
					total += x;
					total += a;
					totalValue.value = total;
				}
				if (b == 1) {
					total = cms;
					if (check_checked == 1) total += changes;
					total += y;
					total += a;
					totalValue.value = total;
				}
			} else {
				cms_checked = 0;
				if (c == 1) {
					total = 0;
					if (check_checked == 1) total += changes;
					total += x;
					total += a;
					totalValue.value = total;
				}
				if (b == 1) {
					total = 0;
					if (check_checked == 1) total += changes;
					total += y;
					total += a;
					totalValue.value = total;
				}
			}
		});

});