using System.ComponentModel.DataAnnotations.Schema;

namespace SimpleTimeTracker
{
    public abstract class BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
    }
}