using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public static class DictionaryService
    {
        public static Dictionary<string, string> tokens=new Dictionary<string, string>();

        public static void Add(string token, string username)
        {
            if (tokens.ContainsKey(token))
            {
                tokens[token] = username;
            }
            else
            {
                tokens.Add(token, username);
            }
        }
        public static string? GetUser(string token)
        {
            if (tokens.ContainsKey(token))
            {
                return tokens[token];
            }
            return null;

        }
        public static void Remove(string token)
        {
            if (tokens.ContainsKey(token)) { tokens.Remove(token); }
            
        }

    }
}
