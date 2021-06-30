using System.Collections.Generic;

namespace SimpleTimeTracker
{ 
    public class ProjectTaskDTO
    {
        public long Id { get; set; }
        
        public ProjectDTO Project { get; set; }

        public string Name { get; set; }

        public string Notes { get; set; } 

        public ICollection<TimeEntryDTO> TimeEntries { get; set; }
    }
}