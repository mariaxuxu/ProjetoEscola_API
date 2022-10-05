using Microsoft.AspNetCore.Mvc;
using ProjetoEscola_API.Controllers;

namespace ProjetoEscola_API.Controllers{
    [ApiController]
    [Route("/")]

    public class HomeController : ControllerBase
    {
        [HttpGet]
        public String Inicio()
        {
            return "Funcionou!";
        }
    }
}