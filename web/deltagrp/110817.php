<?php
function line_gap()
{
	echo '<p style="font-size: .5em;">&nbsp;</p>';
}

// parse week out of file name
$week = substr(basename(__FILE__), 0, -4);

// top banners
$top_banner_links = array(
	1 => 'https://www.delta-grp.com/parts/parts-specials'
);
// bottom banner link
$bottom_banner_links = array(
	1 => 'https://www.delta-grp.com/service/schedule-service'
);

// Education Corner
$EC = array(
	'title' => 'The Truth About Tillage',
	'story' => '“Why do we plow? To make the land like a sponge,” Lynn Boadwine remembers his dad and others telling him from the time he was a boy. Years later',
	'link' => 'http://www.cornandsoybeandigest.com/tillage/truth-about-tillage'
);
// add an image
$EC['image'] = $week . '/education_corner.jpg';
$EC['image_alt'] = $EC['title'];
// add a click here link to article
$EC['story'] .= '...<br /><br />Click <a href="' . $EC['link'] . '" target="_blank">here</a> to read full story';
// $EC['story'] .= '<br />Click <a href="' . $EC['link'] . '" target="_blank">here</a> to read full story';

// National Ag News
$nat_ag_news = array(
	array(
		'title' => 'Satellite Image Accuracy Expands',
		'story' => 'From improved scouting to nitrogen recommendations, image data will enhance farm decisions',
		'link' => 'http://www.cornandsoybeandigest.com/data/satellite-image-accuracy-expands'
	),
	array(
		'title' => 'The Tax Bill Is Farm Friendly, Maybe',
		'story' => 'On Friday, the long awaited tax reform bill saw the light of day and made its way out of the House finance committee. Called the Tax Cuts and Jobs Act, the bill includes the tax reform measures the Trump Administration has been promising since',
		'link' => 'http://www.agweb.com/article/the-tax-bill-is-farm-friendly-maybe-NAA-anna-lisa-laca/'
	),
	array(
		'title' => 'Uncertainty Over Dicamba Insurance Coverage Concerns Applicators',
		'story' => 'Uncertainty over how insurance companies will handle dicamba liability insurance next year is a big concern for chemical applicators',
		'link' => 'http://brownfieldagnews.com/news/uncertainty-over-dicamba-insurance-coverage-concerns-applicators/'
	)
);
?>
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<title>Delta Group Ag Roundup</title>
	<style type="text/css">
		body {
			font-family: Arial, Helvetica, sans-serif;
			font-size: .9em;
		}
		p {
			font-size: 14px;
			line-height: 18px;
			margin: 0px 0px 0px 0px;
			padding: 0px 0px 0px 0px;
		}
		img, a img {
			border: 0px;
			display: block;
		}
		a {
			color: #cc0033;
		}
		table {
			border-collapse: collapse;
		}
		h2 {
			font-size: 22px;
			font-weight: bold;
			margin: 0px 0px 0px 0px;
			padding: 0px 0px 0px 0px;
		}
		h3 {
			font-size: 18px;
			font-weight: bold;
			margin: 0px 0px 0px 0px;
			padding: 0px 0px 0px 0px;
			color: #CC0033;
		}
		li {
		    color: #cc0033;
		}
		li p {
		    color: #000000;
		}
	</style>
</head>
<body bgcolor="#efefef" >
	<center>
		<table cellspacing="0" cellpadding="0" border="0" >
			<tr>
				<td bgcolor="#EFEFEF">
					<center>
						<table>
							<tr>
								<td width="620" bgcolor="#FFFFFF">
									<center>
										<table cellspacing="0" cellpadding="0" border="0" >
											<tr>
												<td bgcolor="#FFFFFF" width="600">
													<p align="center" style="color: #999999;"><small>Need to view this email in a browser? <a><webversion><span style="color: #cc0033;">Click Here</span></webversion></a></small></p>
													<p><img src="images/delta-agroundup-header.jpg" border="0" usemap="#headertabs" /></p>
													<?php
													// output top banners
													$cur_top = 1;
													while (true) {
														// get current image
														$cur_img = $week . '/top_banner' . ($cur_top > 1 ? $cur_top : '') . '.jpg';
														// check if the image exists
														if (!file_exists($cur_img)) {
															break;
														}
														// check if current banner has a link
														$cur_link = isset($top_banner_links[$cur_top]) && !is_null($top_banner_links[$cur_top]);
														// output image
														echo '<p>';
														if ($cur_link) {
															echo '<a href="' . $top_banner_links[$cur_top] . '" target="_blank">';
														}
														echo '<img src="' . $cur_img . '" />';
														if ($cur_link) {
															echo '</a>';
														}
														echo '</p>';
														// itterate cur_top
														$cur_top++;
													}
													?>
												    <table cellspacing="0" cellpadding="0" border="0">
														<tr>
															<td width="160" valign="top" style="padding: 10px; background-color: #f2f2f2;">
															    <?php /*
																<a href="http://www.delta-grp.com/agroundup/<?php echo $week; ?>/coupon.pdf" target="_blank">
																	<img src="<?php echo $week; ?>/coupon.jpg" alt="25 Percent Off One Item" />
																</a>
															    <?php line_gap(); ?>
																*/ ?>

																<a href="https://www.delta-grp.com/equipment/used-equipment" target="_blank"><img src="images/titles/used-equipment-block.jpg" alt="Used Equipment" border="0" width="160" /></a>
																<?php //<a href="http://www.delta-grp.com/usedequipment.php" target="_blank"><img src="images/titles/inventory.jpg" alt="View Full Inventory" border="0" width="160" /></a> ?>
                                                                <?php
																// USED EQUIPMENT
                                                                $used_equip_arr = array();
                                                                // check if we have a json file to read from
                                                                if(file_exists($week . '/equipment/equipment.json')){
                                                                    $used_equip_arr = json_decode(file_get_contents($week . '/equipment/equipment.json'), true);
                                                                }
                                                                // limit the number of pieces of equipment
																// set limit based on whether or not we have a best buy board
																if (file_exists($week . '/equipment/bbb.json')) {
																	$used_equip_arr = array_slice($used_equip_arr, 0, 8);
																} else {
																	$used_equip_arr = array_slice($used_equip_arr, 0, 5);
																}
                                                                /*
                                                                $used_equip_arr = array();
                                                                $used_equip_arr[] = array('header' => '2007 CASE IH MAGNUM 275', 'price' => '$92,500', 'stock' => '2U106755-L', 'img' => $week . '/equipment/2U106755-L.jpg', 'link' => 'http://delta-grp.com/usedequipment.php?equipment=http%3A%2F%2Fwww.tractorhouse.com%2Flistingsdetail%2Fdetail.aspx%3FOHID%3D8773733%26dlr%3D1');
                                                                */
																// output equipment
																foreach ($used_equip_arr as $key => $val) {
																	echo '<div class="section">';
                                                                    $val['Image'] = $week . '/equipment/' . $val['Image'];
																	list($width, $height, $type, $attr) = getimagesize($val['Image']);
																	$max_width = 148;
																	$max_height = 150;
																	$new_height = ($max_width * $height / $width);

																	echo '<div style="width: ' . $max_width . 'px; border: 1px solid #cccccc; padding: 5px; background-color: #fff; text-align: center;">';

																	if ($val['Link'] != '') {
																		echo '<a href="' . $val['Link'] . '" target="_blank">';
																	}
																	echo '<img src="' . $val['Image']  . '" alt="' . preg_replace('/&#?[a-z0-9]+;/i', '', strip_tags($val['Header'])) . '" style="padding-bottom: 5px;"';
																	if ($width > $height && $width >= $max_width  && $new_height < $max_height) { echo ' width="' . $max_width . '"'; }
																	if (($width <= $height && $height >= $max_height) || $new_height > $max_height) { echo ' height="' . $max_height . '"'; }
																	echo ' />';
																	if ($val['Link'] != '') {
																		echo '</a>';
																	}

																	echo '<table cellspacing="0" cellpadding="0" border="0"><tr><td><img src="images/price-tag.jpg" width="18" height="25" /></td><td><table cellspacing="0" cellpadding="0" border="0" ><tr><td height="23" style="height: 23px; padding-right: 5px; padding-left: 3px; border-left: 0px;  border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000;"><span style="font-size: 16px; font-weight: bold; color: #cc0033;">' . $val['Price'] . '</span></td></tr></table></td></tr></table>';

																	echo '</div>';

																	if ($val['Link'] != '') {
																		echo '<a href="' . $val['Link'] . '" target="_blank">';
																	}
																	echo '<p><span style="font-weight: bold; color:#cc0033; font-size: .9em;  margin: 0 0 .2em 0;">' . $val['Header'] . '</span></p>';
																	if ($val['Link'] != '') {
																		echo '</a>';
																	}

																	if ($val['StockNumber']) {
																	    echo '<p><span style="font-size: .8em;"><strong>Stock #' . $val['StockNumber'] . '</strong></span></p>';
																	} elseif ($val['SerialNumber']) {
																		echo '<p><span style="font-size: .8em;"><strong>Serial #' . $val['SerialNumber'] . '</strong></span></p>';
																	}
																	echo '</div>';
																	line_gap();
																}
																?>
																<a href="https://www.delta-grp.com/equipment/used-equipment" target="_blank"><img src="images/titles/inventory.jpg" alt="View Full Inventory" border="0" width="160" /></a>
															</td>
															<td width="400" valign="top" style="padding: 10px;">
																<p><img src="images/titles/education-corner-strip.png" alt="Education Corner" width="400" border="0"></p>
                                                                <div class="section" style="margin-top: 10px;">
                                                                    <table width="400" cellspacing="0" cellpadding="10" border="1" style="border-color:#f7ef92; background-color:#fffef2;">
                                                                        <tr>
                                                                            <td width="400">
                                                                                <h2 style="color: #cc0033;">
																					<?php
																					if ($EC['link'] != '') { echo '<a href="' . $EC['link'] . '" target="_blank">'; }
																					echo $EC['title'];
																					if ($EC['link'] != '') { echo '</a>'; }
																					?>
																				</h2>
                                                                                <p style="margin: 3px 8px;">
																					<?php if ($EC['link'] != '') { echo '<a href="' . $EC['link'] . '" target="_blank">'; } ?>
																					<img src="<?php echo $EC['image']; ?>" alt="<?php echo $EC['image_alt']; ?>" border="0" style="padding: 0px 0px 15px 15px;" align="right">
																					<?php if ($EC['link'] != '') { echo '</a>'; } ?>
																				</p>
                                                                                <p><?php echo $EC['story']; ?></p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                                <?php line_gap(); ?>

																<?php if (file_exists($week . '/special_slide.jpg')): ?>
																	<div class="section">
																		<a href="http://www.delta-grp.com/deltagrp/service.php" target="_blank">
																			<img src="<?php echo $week; ?>/special_slide.jpg" />
																		</a>
																	</div>
																<?php endif; ?>

																<?php
																	//line_gap();
																    // start best buy board
																    $bbbArr = array();
																	// check if we have a json file to read from
																	if (file_exists($week . '/equipment/bbb.json')):
																		$bbbArr = json_decode(file_get_contents($week . '/equipment/bbb.json'), true);
																?>
																	<div class="section" style="width: 100%; background-color:#fffef2;">
																	    <img src="images/titles/best_buy_board.jpg" />
																		<?php line_gap(); ?>
																	    <table style="width: 100%; border-style: solid; border-width: 1px; border-color: #222222;">
																	        <?php
																	            $cols = 2;
																	            $curCols = 1;
																	            $max_width = 168;
																	            $max_height = 150;
																	            foreach ($bbbArr as $val) {
																	                if ($curCols == 1) { echo '<tr>'; }
																	                echo '<td style="text-align: center;">';
																	                echo '<div style="width: ' . $max_width . 'px; background-color: #ffffff; padding: 5px; border: 1px solid #cccccc; margin: 0 auto;">';
																	                // open link if available
																	                if ($val['Link'] != '') { echo '<a href="' . $val['Link'] . '" target="_blank">'; }
																	                // output image
																	                echo '<img src="' . $week . '/equipment/' . $val['Image']  . '" alt="' . preg_replace('/&#?[a-z0-9]+;/i', '', strip_tags($val['Header'])) . '" style="padding-bottom: 5px;" width="168" height="116" />';
																	                // close link if it exists
																	                if ($val['Link'] != '') { echo '</a>'; }
																	                // PRICE
																	                // check for was
																	                if ($val['was'] != '') {
																	                    echo '<table cellspacing="0" cellpadding="0" border="0"><tr><td><strong style="color: #000;">Was: </strong></td><td><img src="images/price-tag.jpg" width="18" height="25" /></td><td><table cellspacing="0" cellpadding="0" border="0" ><tr><td height="23" style="height: 23px; padding-right: 5px; padding-left: 3px; border-left: 0px;  border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000;"><span style="font-size: 16px; font-weight: bold; color: #000000; text-decoration: line-through;">' . $val['was'] . '</span></td></tr></table></td></tr></table>';
																	                }
																	                echo '<table cellspacing="0" cellpadding="0" border="0" ><tr>';
																	                if ($val['was'] != '') {
																	                    echo '<td><strong style="color: #cc0033;">Now: </strong></td>';
																	                }
																	                echo '<td><img src="images/price-tag.jpg" width="18" height="25" /></td><td><table cellspacing="0" cellpadding="0" border="0" ><tr><td height="23" style="height: 23px; padding-right: 5px; padding-left: 3px; border-left: 0px;  border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000;"><span style="font-size: 16px; font-weight: bold; color: #cc0033;">' . $val['Price'] . '</span></td></tr></table></td></tr></table>';

																	                echo '</div>';

																	                if ($val['Link'] != '') { echo '<a href="' . $val['Link'] . '" target="_blank">'; }
																	                echo '<p><span style="font-weight: bold; color:#cc0033; font-size: .9em;  margin: 0 0 .2em 0;">' . $val['Header'] . '</span></p>';
																	                if ($val['Link'] != '') { echo '</a>'; }
																	                if ($val['StockNumber'] != '') {
																	                    echo '<p><span style="font-size: .8em;"><strong>Stock #' . $val['StockNumber'] . '</strong></span></p>';
																	                } elseif ($val['SerialNumber'] != '') {
																	                    echo '<p><span style="font-size: .8em;"><strong>Serial #' . $val['SerialNumber'] . '</strong></span></p>';
																	                }
																	                echo '</td>';
																	                if ($curCols == $cols) {
																	                    echo '</tr>';
																	                    $curCols = 1;
																	                } else {
																	                    $curCols++;
																	                }
																	            }
																	            if ($curCols != 1) {
																	                while($curCols != $cols + 1){
																	                    echo '<td></td>';
																	                    $curCols++;
																	                }
																	                echo '</tr>';
																	            }
																	        ?>
																	    </table>
																	</div>
																<?php endif; // end best buy board ?>
																<?php line_gap(); ?>

                                                                <div class="section">
                                                                    <a href="https://www.delta-grp.com/parts/parts-specials" target="_blank">
                                                                        <p>
                                                                            <img src="images/titles/part-specials-block.jpg" alt="Featured Part Specials of the Week" width="400" border="0">
																		</p>
																		<p  style="margin-top: 10px;">
                                                                            <img src="<?php echo $week; ?>/parts-specials.gif" alt="Parts Specials" width="400" />
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                                <?php line_gap(); ?>

                                                                <img src="images/titles/national-news.jpg" />
																<?php line_gap(); ?>
																<?php
																foreach ($nat_ag_news as $tmp) {
																	echo '<div class="section">
																		<h3><a href="' . $tmp['link'] . '" target="_blank"><span style="color:#cc0033;">' . $tmp['title'] . '</span></a></h3>
																		<p>' . (!empty($tmp['story']) ? $tmp['story'] . '...' : '') . '</p>
																	</div>
																	<p style="font-size: .5em;">&nbsp;</p>';
																}
																?>
															</td>
														</tr>
													</table>
													<?php
													// output top banners
													$cur_top = 1;
													while (true) {
														// get current image
														$cur_img = $week . '/bottom_banner' . ($cur_top > 1 ? $cur_top : '') . '.jpg';
														// check if the image exists
														if (!file_exists($cur_img)) {
															break;
														}
														// check if current banner has a link
														$cur_link = isset($bottom_banner_links[$cur_top]) && !is_null($bottom_banner_links[$cur_top]);
														// output image
														echo '<p>';
														if ($cur_link) {
															echo '<a href="' . $bottom_banner_links[$cur_top] . '" target="_blank">';
														}
														echo '<img src="' . $cur_img . '" />';
														if ($cur_link) {
															echo '</a>';
														}
														echo '</p>';
														// itterate cur_top
														$cur_top++;
													}
													?>
                                                    <?php line_gap(); ?>
                                                    <p><img src="images/banners/locations_sm.jpg" alt="Locations" width="295" height="35" border="0" /></p>
													<table style="width: 600px;">
														<tr>
															<td><p align="center"><strong><a href="https://www.delta-grp.com/about/locations/leland">Leland</a></strong></p>
															<p align="center"><small>(662) 686-2361</small></p></td>
															<td width="8">&nbsp;</td>
															<td><p align="center"><strong><a href="https://www.delta-grp.com/about/locations/yazoo-city">Yazoo City</a></strong></p>
															<p align="center"><small>(662) 746-4421</small></p></td>
															<td width="8">&nbsp;</td>
															<td><p align="center"><strong><a href="https://www.delta-grp.com/about/locations/belzoni">Belzoni</a></strong></p>
															<p align="center"><small>(662) 247-1221</small></p></td>
															<td width="8">&nbsp;</td>
															<td><p align="center"><strong><a href="https://www.delta-grp.com/about/locations/greenwood">Greenwood</a></strong></p>
															<p align="center"><small>(662) 453-6525</small></p></td>
															<td width="8">&nbsp;</td>
															<td><p align="center"><strong><a href="https://www.delta-grp.com/about/locations/cleveland">Cleveland</a></strong></p>
															<p align="center"><small>(662) 843-2741</small></p></td>
															<td width="8">&nbsp;</td>
															<td><p align="center"><strong><a href="https://www.delta-grp.com/about/locations/rolling-fork">Rolling Fork</a></strong></p>
															<p align="center"><small>(662) 873-2661</small></p></td>
														</tr>
													</table>
													<?php line_gap(); ?>
													<p align="center" style="color: #999999;"><small><small>We reserve the right to limit quantities. Not responsible for typographical or pictorial errors.<br />Products may not be available at all locations.</small><br >If you wish to no longer receive emails, <unsubscribe><span style="color: #cc0033;">unsubscribe</span></unsubscribe>.</small></p>
												</td>
											</tr>
										</table>
									</center>
								</td>
							</tr>
						</table>
					</center>
				</td>
			</tr>
		</table>
	</center>
	<map name="headertabs">
	    <area shape="rect" coords="0,0,125,115" href="https://www.delta-grp.com/" target="_blank" alt="Delta Group Home">
		<area shape="rect" coords="125,4,221,59" href="https://www.delta-grp.com/equipment/new-equipment" target="_blank" alt="Equipment">
		<area shape="rect" coords="230,4,294,59" href="https://www.delta-grp.com/parts" target="_blank" alt="Parts">
		<area shape="rect" coords="303,4,382,59" href="https://www.delta-grp.com/service" target="_blank" alt="Service">
		<area shape="rect" coords="391,4,502,59" href="https://www.delta-grp.com/equipment/technology-solutions" target="_blank" alt="Precision Ag">
		<area shape="rect" coords="511,4,600,59" href="https://www.delta-grp.com/about/locations" target="_blank" alt="Locations">
	</map>
</body>
</html>
