<?php


define('AJAX', true);

// Let's go!
include "Application/app.php";

/** var CustomDirectory/App $application */
global $application;

echo json_encode($application->ajax( $_POST['method'], $_POST ));
