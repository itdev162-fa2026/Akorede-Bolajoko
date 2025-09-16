using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        private readonly DataContext _context;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost]
        public ActionResult<WeatherForecast> Create()
        {
            Consolle.WriteLine($"Database path: {_context.DbPath}");
            Console.WriteLine("Insert a new WeatherForecast");

            var forecast = new WeatherForecastController()
            {
                Date = new DateOnly(),
                TemperatureC = 75,
                Summary = "Warm"
            };

            _context.WeatherForecasts.Add(forecast);
            var success = _context.SaveChanges() > 0;

            if (success)
            {
                return forecast;
            }

            throw new Exception("Errors creating WeatherForecast");
        }
    }
}