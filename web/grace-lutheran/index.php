<?php include ('inc/session.php');?>
<!DOCTYPE html>
<html>
<head>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600italic|Lora:400,700italic' rel='stylesheet' type='text/css'>
	<link href="css/font-awesome.min.css" rel="stylesheet">
	<meta charset="utf-8">
	<title>Grace Lutheran Church of Red Lion</title>
	<link href="css/styles.css" rel="stylesheet" type="text/css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script>
			$(document).ready(function () {
		    //rotation speed and timer
		    var speed = 5000;

		    var run = setInterval(rotate, speed);
		    var slides = $('.slide');
		    var container = $('#slides ul');
		    var elm = container.find(':first-child').prop("tagName");
		    var item_width = container.width();
		    var previous = 'prev'; //id of previous button
		    var next = 'next'; //id of next button
		    slides.width(item_width); //set the slides to the correct pixel width
		    container.parent().width(item_width);
		    container.width(slides.length * item_width); //set the slides container to the correct total width
		    container.find(elm + ':first').before(container.find(elm + ':last'));
		    resetSlides();


		    //if user clicked on prev button

		    $('#buttons a').click(function (e) {
		        //slide the item

		        if (container.is(':animated')) {
		            return false;
		        }
		        if (e.target.id == previous) {
		            container.stop().animate({
		                'left': 0
		            }, 1500, function () {
		                container.find(elm + ':first').before(container.find(elm + ':last'));
		                resetSlides();
		            });
		        }

		        if (e.target.id == next) {
		            container.stop().animate({
		                'left': item_width * -2
		            }, 1500, function () {
		                container.find(elm + ':last').after(container.find(elm + ':first'));
		                resetSlides();
		            });
		        }

		        //cancel the link behavior
		        return false;

		    });

		    //if mouse hover, pause the auto rotation, otherwise rotate it
		    container.parent().mouseenter(function () {
		        clearInterval(run);
		    }).mouseleave(function () {
		        run = setInterval(rotate, speed);
		    });


		    function resetSlides() {
		        //and adjust the container so current is in the frame
		        container.css({
		            'left': -1 * item_width
		        });
		    }

		});
		//a simple function to click next link
		//a timer will call this function, and the rotation will begin

		function rotate() {
		    $('#next').click();
		}
	</script>
</head>
<body>
	<?php include'header.php'; ?>
	<div id="glh_welcome_wrap">
		<div class="group">
			<div class="grid_6_of_6">
				<h1>Welcome to Grace Lutheran</h1>
				<h1 class="twopush">Church of Red Lion</h1>
				<div class="hrish"></div>
				<div class="glh_top">
					<p class="sixty_squeeze">Grace Church welcomes many community organizations to its facilities: Historical Society, Garden Club, T.O.P.S., Scouts, Alcoholics Anonymous, Lions, Business and Professional Women. We realize that much of what we have by way of property and resource is a gift from God through those who have worshiped before us in this place. So we thank God for our history, we embrace our present opportunities to worship and serve Him here, and we treasure the knowledge of His presence and guidance as we eagerly anticipate the future.</p>
				</div>
			</div>
		</div>
	</div>
	<div class="gl_gry_bar"></div>
	<div id="glh_service_wrap" class="gl-church-bg">
		<div class="group">
			<div class="grid_6_of_6">
				<h2 id="glh_service_bar">Offering Two Different Sunday Worship Services:</h2>
			</div>
		</div>
		<div class="group">
			<div class="grid_1_of_6"></div>
			<div class="grid_2_of_6">
				<img alt="Traditional Service" src="img/trad_sym.png">
				<h3><span class="yell">9am:</span> Contemporary</h3>
				<h3>service in the Spirit</h3>
				<h3>Cellar, with breakfast.</h3><a href="thefaith.php">
				<div class="gl_button">
					Learn More
				</div></a>
			</div>
			<div class="grid_2_of_6">
				<img alt="Contemporary Service" src="img/cont_sym.png">
				<h3><span class="yell">10:45am:</span> Traditional</h3>
				<h3>Service in the</h3>
				<h3>Sanctuary.</h3><a href="thefaith.php">
				<div class="gl_button">
					Learn More
				</div></a>
			</div>
			<div class="grid_1_of_6"></div>
		</div>
	</div>
	<div class="gl_gry_bar"></div>
	<div id="glh_event_wrap">
		<div class="group">
			<div class="grid_6_of_6">
				<h3>Join us for one of our upcoming events:</h3>
			</div>
		</div>
		<div class="group">
			<div class="grid_1_of_6"></div>
			<div class="grid_4_of_6">
				<div id="carousel">
				    <div id="slides">
				        <ul>
				            <li class="slide">
											<div class="authorContainer">
												 <p class="quote-author">December 24, 2017</p>
										 </div>
				                <div class="quoteContainer">
				                    <p class="quote-phrase"><span class="quote-marks">"</span>10:00 am - 11:15 am: Joint Advent 4 Worship<class="quote-marks">"</span>
				                    </p>
				                </div>
				            </li>
										<li class="slide">
										 <div class="authorContainer">
												<p class="quote-author">December 24, 2017</p>
										</div>
											 <div class="quoteContainer">
													 <p class="quote-phrase"><span class="quote-marks">"</span>5:30 pm - 6:30 pm: Christmas Eve Contemporary Worship<class="quote-marks">"</span>
													 </p>
											 </div>
									 </li>
									 <li class="slide">
									  <div class="authorContainer">
									 		<p class="quote-author">December 24, 2017</p>
									 </div>
									 	 <div class="quoteContainer">
									 			 <p class="quote-phrase"><span class="quote-marks">"</span>10:45 pm - 11:45 pm: Christmas Eve Traditional Worship<class="quote-marks">"</span>
									 			 </p>
									 	 </div>
									 </li>
				        </ul>
				    </div>
					</div>
					<div class="btn-bar">
				    <div id="buttons"><a id="prev" href="#"><i class="fa fa-arrow-left" aria-hidden="true"></i></a><a id="next" href="#"><i class="fa fa-arrow-right" aria-hidden="true"></i></a> </div>
					</div>
				</div>
			<div class="grid_1_of_6"></div>
		</div>
	</div>
	<div class="gl_gry_bar"></div>
	<div id="glh_meet_wrap">
		<div class="group">
			<div class="grid_6_of_6">
				<div class="glh_meet1">
					<h3>Graceful History</h3>
					<p class="glh_meet_p1">Grace Evangelical Lutheran Church owes its origin 1893 to the efforts of the York County Missionary Committee. During that year and in early 1894, the Rev. A. M. Heilman of Dallastown and Gettysburg Seminary students preached here at services held in Fairmount Park. A York committee selected the present site at the corner of North Charles <a href="thefaith.php">Read more...</a></p>
				</div>
			</div>
		</div>
		<div class="group">
			<div class="grid_6_of_6"><img alt="Believe in higher power!" class="cross" src="img/cross.jpg"></div>
		</div>
		<div class="group">
			<div class="grid_4_of_6">
				<div class="glh_meet2">
					<h3>Anything else? Ask away.</h3>
					<p class="glh_meet_p2">We are a caring community and we're here to help you learn more about what we do.</p><a href="contact.php">
					<div class="gl_button_x">
						Contact Us
					</div></a>
				</div>
			</div>
			<div class="grid_2_of_6"></div>
		</div>
	</div><img alt="Pastor Dan" class="glh_pastor" src="img/pastordan.png">
	<div class="gl_gry_bar"></div>
	<div id="gl_footer_wrap">
		<div class="group">
			<div class="grid_3_of_6">
				<div class="glh_footer_box1">
					<h4 class="footer_shift">Grace Lutheran Church of Red Lion</h4>
					<p>220 North Charles Street Red Lion, PA 17356</p>
					<p>Phone: 1-717-244-5987</p>
				</div>
			</div>
			<div class="grid_3_of_6">
				<div class="glh_footer_box2">
					<h4>Support the faith.</h4><a href="#">
					<div class="gl_button_y">
						Donate Today
					</div></a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
