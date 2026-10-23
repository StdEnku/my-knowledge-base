<?php

class WeatherReportGetObject {
    public const REGIONCODE_AICHI = 220000;
    public const REGIONCODE_GIFU = 230000;
    public const REGIONCODE_TOKYO = 150000;

    private $_regionCode;

    public function __construct($regionCode) {
        $this->_regionCode = $regionCode;
    }

    public function Report() : string {
        $url = "https://www.jma.go.jp/bosai/forecast/data/forecast/{$this->_regionCode}.json";
        $weather_json = file_get_contents($url);
        $weather_array = json_decode($weather_json, true);
        $date = $weather_array["0"]["timeSeries"]["0"]["timeDefines"]["0"];
        $jma_weather = $weather_array["0"]["timeSeries"]["0"]["areas"]["0"]["weathers"]["0"];
        return "今日の天気:" . $jma_weather. "\n";
    } 
}