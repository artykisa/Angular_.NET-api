using System;

namespace TodoApi.Models
{
    [Serializable]
    public class User
    {
        public string lastName { get; set; }
        public string firstName { get; set; }
        public string email { get; set; }
        public override string ToString()
        {
            return $"{firstName} {lastName} - {email}\n";
        }
    }
}
