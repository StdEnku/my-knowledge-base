<?php

require_once __DIR__ . "/../Infrastructures/WeatherReportGetObject.php";

class WeatherGetterController {
    //http://localhost/weather_getter/?path=selctRegion
    public function SelectRegion() {
        require_once __DIR__ . "/../views/SelectRegionPage.phtml";
    }

    //http://localhost/weather_getter/?path=result
    public function Result() {
        $region = $_POST['region'];
        $url = "https://www.jma.go.jp/bosai/forecast/data/forecast/150000";

        $result = "";
        $wrgo = null;
        if($region == "tokyo") {
            $wrgo = new WeatherReportGetObject(WeatherReportGetObject::REGIONCODE_TOKYO);
        }else if($region == "gifu") {
            $wrgo = new WeatherReportGetObject(WeatherReportGetObject::REGIONCODE_GIFU);
        }else if($region == "aichi") {
            $wrgo = new WeatherReportGetObject(WeatherReportGetObject::REGIONCODE_AICHI);
        }
        $result =  $wrgo->Report();

        require_once __DIR__ . "/../views/ResultPage.phtml";
    }
}