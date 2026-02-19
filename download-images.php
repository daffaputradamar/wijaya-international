<?php

$images = [
    'hero-bg.jpg' => 'https://framerusercontent.com/images/wFwvr8wWWkhPAJJCefwyydsNl8.png',
    'consumer-electronics.jpg' => 'https://framerusercontent.com/images/0cLoSfTjwokDdPh6ZkTjoBgVvA.jpg',
    'road-landscape.jpg' => 'https://framerusercontent.com/images/wFwvr8wWWkhPAJJCefwyydsNl8.png',
];

$dest = __DIR__.'/public/images/wijaya';

foreach ($images as $fname => $url) {
    $path = $dest.'/'.$fname;
    echo "Downloading $fname ...\n";
    $ctx = stream_context_create(['http' => ['header' => "User-Agent: Mozilla/5.0\r\n"]]);
    $data = file_get_contents($url, false, $ctx);
    if ($data === false) {
        echo "  FAILED\n";

        continue;
    }
    file_put_contents($path, $data);
    echo '  saved '.strlen($data)." bytes -> $path\n";
}

echo "Done.\n";
