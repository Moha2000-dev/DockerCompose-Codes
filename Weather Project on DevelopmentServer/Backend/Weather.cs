using Microsoft.EntityFrameworkCore;

namespace WeatherApp
{
    public class Weather
    {

        public int Id { get; set; }
        public string CityName { get; set; }

        public int degree { get; set; }

    }
}
