<!DOCTYPE HTML>
<!--
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
	<head>
		<title>Atom</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<link rel="stylesheet" href="assets/css/animate.css">
		<link rel="icon" href="/assets/images/atom.png">
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
	</head>
	<body class="is-preload">

		<!-- Wrapper -->
			<div id="wrapper">

				<!-- Nav -->
					<nav id="nav">
						<ul>
							<img src="assets/images/logo.png" width="175" alt="">
							<li><a href="#first" class="wow fadeInUp" data-wow-delay="1s">Файлы</a></li>
							<li><a href="#second" class="wow fadeInUp" data-wow-delay="1.25s">Картинки</a></li>
							<li><a href="./admin/index.php" class="wow fadeIn" data-wow-delay="1.5s">Редактор</a></li>
						</ul>
					</nav>

				<!-- Main -->
					<div id="main">

						<!-- First Section -->
							<section id="first" class="main special">
								<header class="major wow fadeIn" data-wow-delay="0.5s">
									<h2>Файлы</h2>
								</header>
								
								<ul class="features">
<?php
    $dir = "./FILES/word/";   //задаём имя директории
    if(is_dir($dir)) {   //проверяем наличие директории
         $files = scandir($dir);    //сканируем (получаем массив файлов)
         array_shift($files); // удаляем из массива '.'
         array_shift($files); // удаляем из массива '..'
         for($i=0; $i<sizeof($files); $i++) echo '<li class="wow fadeIn" data-wow-delay="0.5s"><a href="'.$dir.$files[$i].'" title="Открыть"><img src="assets/images/doc.png" alt=""></br>'.$files[$i].'</a></li>';  //выводим все файлы
    } 
    else echo $dir.' -такой директории нет;<br>';
?>
							</section>
							
							<section id="second" class="main special">
								<header class="major wow fadeIn" data-wow-delay="0.5s">
									<h2>Картинки</h2>
								</header>
								
								<ul class="features">
<?php
$dir = "./FILES/images/";   //задаём имя директории
    if(is_dir($dir)) {   //проверяем наличие директории
         $files = scandir($dir);    //сканируем (получаем массив файлов)
         array_shift($files); // удаляем из массива '.'
         array_shift($files); // удаляем из массива '..'
         for($i=0; $i<sizeof($files); $i++) echo '<li class="wow fadeIn" data-wow-delay="0.5s"><img src="'.$dir.$files[$i].'" width="300" height="200"></a></li>';  //выводим все файлы
    } 
    else echo $dir.' -такой директории нет;<br>';
?>
							</section>
							
					</div>

			</div>

			<!-- Footer -->
					<footer id="footer">
						<section class="wow fadeInLeft" data-wow-delay="0.1s">

						</section>
					</footer>

		<!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrollex.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>
			<script src="assets/js/wow.min.js"></script>

		<!-- Анимация -->
    	<script>
      		new WOW().init();
    	</script>

	</body>
</html>
