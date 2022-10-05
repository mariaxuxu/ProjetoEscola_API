using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class Curso
    {

        public int id { get; set; }
        [Required(ErrorMessage = "O campo CodCurso é obrigatório.")]
        [Range(1, 99, ErrorMessage = "Digite o {0} sendo um número entre {1}-{2}.")]
        public int codCurso { get; set; }
        [Required(ErrorMessage = "O campo Nome é obrigatório.", AllowEmptyStrings = false)]
        [StringLength(30, ErrorMessage = "O campo Nome não pode ultrapassar {1} caracteres")]
        public string? nomeCurso { get; set; }
        public string? periodo { get; set; }
    }
}