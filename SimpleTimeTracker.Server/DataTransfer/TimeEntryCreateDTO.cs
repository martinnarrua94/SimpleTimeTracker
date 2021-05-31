using System;

namespace SimpleTimeTracker 
{
    public class TimeEntryCreateDTO
    {
        public DateTime StartDate {get; set; }

        public DateTime? EndDate {get; set; }

        public long ProjectId {get; set; }

        public long ProjectTaskId {get; set; }

        public string Notes {get; set; }    
    }
}