
using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class Aluno
    {
        public int id { get; set; }
        [Required]
        [StringLength(5, ErrorMessage = "Forneça RA de 5 digitos")]
        public string? ra { get; set; }
        [Required]
        [StringLength(20, ErrorMessage = "Coloque apenas o primeiro nome")]
        public string? nome { get; set; }
        public int codCurso { get; set;}
    }
}