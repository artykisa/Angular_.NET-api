using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly MyContext _context;
        private readonly ILogger<UsersController> _logger;
        public UsersController(MyContext context, ILogger<UsersController> logger)
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet]
        public async Task<List<User>> GetAsync(int limit=10, int page=0)
        {
            string baseUrl = $"https://dummyapi.io/data/api/user?limit={limit}&page={page}";
            HttpClient client = new HttpClient();
            List<User> list = new List<User>();
            client.BaseAddress = new Uri("http://localhost:64195/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("app-id", "603e6c3398399597c74258a8");
            _logger.LogInformation(baseUrl);

            try
            {

                HttpResponseMessage response = await client.GetAsync(baseUrl);
                if (response.IsSuccessStatusCode)
                {

                    string responseBody = await response.Content.ReadAsStringAsync();
                    _logger.LogInformation(responseBody);
                    Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(responseBody);
                    foreach (var i in myDeserializedClass.data)
                    {
                        list.Add(i);
                    }
                }
                return list;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return list;
        }

        [HttpGet, DisableRequestSizeLimit]
        [Route("downloadXML")]
        public async Task<ActionResult> DownloadXMLAsync()
        {
            List<User> list = await GetAsync(50);
            return Ok(list);
        }

        [HttpGet, DisableRequestSizeLimit]
        [Route("downloadTXT")]
        public async Task<ActionResult> DownloadTXTAsync()
        {
            List<User> list = await GetAsync(50);
            StringBuilder str = new StringBuilder();
            foreach(var value in list)
            {
                str.Append(value.ToString());
            }
            return Ok(str.ToString());
        }

        [HttpGet, DisableRequestSizeLimit]
        [Route("downloadGroup")]
        public async Task<ActionResult> DownloadGroupAsync()
        {
            List<User> list = await GetAsync(50);
            var groupList = (from User in list
                             group User.email by User.firstName).Select(g => new
                             {
                                 Name = g.Key,
                                 Email = g.Select(p => p)
                             }).ToList();
            StringBuilder str = new StringBuilder();
            foreach (var value in groupList)
            {
                str.Append($"{value.Name} ");
                foreach(var val in value.Email)
                {
                    str.Append($"{val} ");
                }
                str.Append("\n");
            }
            return Ok(str.ToString());
        }
    }
}
