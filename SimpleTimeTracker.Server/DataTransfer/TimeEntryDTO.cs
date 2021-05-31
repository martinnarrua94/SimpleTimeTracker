using System;

namespace SimpleTimeTracker 
{
    public class TimeEntryDTO
    {
        public long Id { get; set; }
        
        public DateTime StartDate {get; set; }

        public DateTime? EndDate {get; set; }

        public ProjectDTO Project {get; set; }

        public ProjectTaskDTO ProjectTask {get; set; }

        public string Notes {get; set; }    
    }
}