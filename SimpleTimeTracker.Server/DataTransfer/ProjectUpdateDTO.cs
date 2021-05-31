using System.ComponentModel.DataAnnotations;

namespace SimpleTimeTracker
{
    public class ProjectUpdateDTO
    {
        [Required]
        public string Name { get; set; }

        public string Notes { get; set; }
    }
}