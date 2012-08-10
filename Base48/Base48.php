<?php
// Validate entrypoint.
if ( !defined( 'MEDIAWIKI' ) ) {
  die( 'This file is a MediaWiki extension, it is not a valid entry point' );
}

$wgAutoloadClasses['Base48Hooks'] = dirname(__FILE__) . '/Base48.hooks.php';

new Base48Hooks();

?>
