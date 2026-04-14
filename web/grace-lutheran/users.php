<?php include 'inc/session.php';
if($_SESSION['usertypeid']!=100){
	header('Location: logout.php');
	exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <link href=
    'https://fonts.googleapis.com/css?family=Open+Sans:400,600italic|Lora:400,700italic'
    rel='stylesheet' type='text/css'>
    <meta charset="utf-8">
    <title>Grace Lutheran Church of Red Lion</title>
    <link href="css/styles.css" rel="stylesheet" type="text/css">
</head>
<body>

    <?php include'header.php'; ?>
    
    <div id="glh_welcome_wrap">
        <div class="group">
            <div class="grid_6_of_6">
                <h1>Welcome to Your</h1>
                <h1 class="twopush">Membership Portal</h1>
                <div class="hrish"></div>
                <div class="glh_top">
                    <img alt="The Holy Trinity" class="glh_ht" src=
                    "img/holytrinity.png">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris cursus sed elit ac aliquet.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="gl_gry_bar"></div>
    <div id="glh_service_wrap">
        <div class="group">
            <div class="grid_6_of_6">
                <h2 id="glh_service_bar">Thanks for signing in!</h2>
            </div>
        </div>
        <div class="group">
            <div class="grid_6_of_6">
            <h3>
<?php
echo 'Welcome to your portal: ' . get_current_user();
?>
</h3>
            </div>
        </div>
    </div>
    <div class="gl_gry_bar"></div>
    <div id="glh_event_wrap">
        <div class="group">
            <div class="grid_6_of_6">
                <h3>You are not added to our church.</h3>
            </div>
        </div>
        <div class="group">
        
           <div class="grid_1_of_6"></div>
           
            <div class="grid_4_of_6">
             
      
               
            </div>
             <div class="grid_1_of_6"></div>
        </div>
    </div>
    <div class="gl_gry_bar"></div>
    <div id="glh_meet_wrap">
        <div class="group">
            <div class="grid_6_of_6">
                <div class="glh_meet1">
                    <h3>Events Archive:</h3>
                    <p class="glh_meet_p1">Vestibulum placerat est in orci
                    malesuada, vitae fringilla quam finibus. Cras velit nulla,
                    gravida vitae nibh sodales, eleifend vulputate purus.
                    Aliquam scelerisque ipsum orci, vel commodo neque gravida
                    sed. Nullam faucibus quis turpis non aliquam. Morbi
                    facilisis, felis in maximus laoreet, nulla est suscipit
                    justo.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="gl_gry_bar"></div>
    <div id="gl_footer_wrap">
        <div class="group">
            <div class="grid_3_of_6">
                <div class="glh_footer_box1">
                    <h4 class="footer_shift">Grace Lutheran Church of Red
                    Lion</h4>
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