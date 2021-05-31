using System;

namespace SimpleTimeTracker
{
    public class TimeEntryFilterDTO
    {
        public DateTime? RangeStartDate { get; set; }

        public DateTime? RangeEndDate { get; set; }

        public long? ProjectId { get; set; }

        public long? ProjectTaskId { get; set; }
    }
}
