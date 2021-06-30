using System.Collections.Generic;

namespace SimpleTimeTracker
{
    public class ProjectDTO
    {
        public long Id { get; set; }
        
        public string Name { get; set; }

        public string Notes { get; set; }

        public ICollection<ProjectTaskDTO> ProjectTasks { get; set; }
    }
}