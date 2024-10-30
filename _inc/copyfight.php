<?php

$url = 'http' . (isset( $_SERVER['HTTPS'] ) ? 's' : '') . '://' . "{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";
$url = parse_url( $url, PHP_URL_SCHEME ) . '://' . parse_url( $url, PHP_URL_HOST ) . parse_url( $url, PHP_URL_PATH );
$url = preg_replace( '/(.*)\/.*?$/', '$1/', $url );
$url = str_replace( '_inc', 'cache', $url );

$copyfight_hash = !empty( $_GET['hash'] ) ? $_GET['hash'] : false;
$copyfight_typeface = !empty( $_GET['font'] ) ? substr( $_GET['font'], 0, -4 ) : false;

$subdir = substr( $copyfight_hash, 0, 1 );

header('Content-type: text/css; charset: UTF-8');

$css = file_get_contents( __DIR__ . '/copyfight-cdn.css' );
$css = str_replace( '{copyfight_hash}', $url . $subdir . '/' . $copyfight_hash, $css );
$css = str_replace( '{copyfight_typeface}', $url . urldecode( $copyfight_typeface ), $css );

echo $css;
die;