<?php include 'inc/session.php';
if($_SESSION['usertypeid']!=300){
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
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/tablesorterstyles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script type="text/javascript" src="script/jquery.tablesorter.js"></script>
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
//echo 'Welcome to your portal: ' . get_current_user();
echo 'Welcome to your portal: '. $_SESSION['fname'];
?>
</h3>
            </div>
        </div>
    </div>
    <div class="gl_gry_bar"></div>
    <div id="glh_event_wrap">
        <div class="group">
         <div class="grid_1_of_6"></div>
            <div class="grid_4_of_6">
                <h3>Messages:</h3>
                	<table id="msgtable" class="tablesorter">
                    <thead>
                    <tr>
                    	<th>From</th>
                        <th>View Message</th>
                     </tr>
                     </thead>
                 <tbody>
<?php
$sql = "SELECT `users`.`userid`,`users`.`email`,`users`.`fname`,`users`.`lname` FROM `users` WHERE `userid` IN (SELECT DISTINCT `from` FROM `messages` WHERE `to`={$_SESSION['userid']})";
$result = mysqli_query($con, $sql);
while ($row=mysqli_fetch_array($result)){
	$sql2 = "SELECT COUNT (`messageid`) as 'count' FROM `messages` WHERE `read`=0 AND `to`={$_SESSION['userid']} AND `from`=".$row['userid'];
	$result2 = mysqli_query($con, $sql2);
	$count='';
	$row2 = mysqli_fetch_array($result2);
	
	
	echo '<tr>'
	.'<td>' . $row['fname'] .' '. $row['lname'] . '</td>'
	.'<td><a href="message.php?userid='.$row['userid'].'">'.' '.'View Messages ('.$row2['count'].' new)</a></td>'
	.'</tr>';
}
?>            
     </tbody>
     </table>            
                 
                 
                 
           		</div>
        	 <div class="grid_1_of_6"></div>
        </div>
        
     </div>
    
   

    <div class="gl_gry_bar"></div>
    <div id="glh_meet_wrap">
        <div class="group">
         <div class="grid_1_of_6"></div>
            <div class="grid_4_of_6">
               
                                    <!-- users -->
<h3>Recent Users</h3><br>
<table id="usertable" class="tablesorter"> 
<thead> 
<tr> 
    <th>Last Name</th> 
    <th>First Name</th> 
    <th>Email</th> 
    <th>Edit</th> 
</tr> 
</thead>
<?php
$sql=("SELECT * FROM `users` WHERE `active`=1");
$result=mysqli_query($con,$sql);
while($row=mysqli_fetch_array($result)){
	echo '<tr>'
		.'<td>'.$row['fname'].'</td>'
		.'<td>'.$row['lname'].'</td>'
		.'<td>'.$row['email'].'</td>'
		.'<td><a href="edit-users.php?p='.$row['userid'].'">EDIT</a></td>'
		.'</tr>';}
?>
                    
  </table> 
                
            </div>
            <div class="grid_1_of_6"></div>
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
    <script>
    $(document).ready(function() 
    { 
        $("#msgtable").tablesorter( {sortList: [[0,0], [1,0]]} ); 
    } 
); 
</script>

</body>
</html>