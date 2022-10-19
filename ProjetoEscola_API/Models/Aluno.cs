
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
        [Range(1, 99, ErrorMessage = "Digite o {0} sendo um número entre {1}-{2}.")]
        public int codCurso { get; set;}
    }
}