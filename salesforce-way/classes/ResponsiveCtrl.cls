public class ResponsiveCtrl
{
  @RemoteAction
   public static Account[] getAccts()
   {
     return [Select Name From Account];
   }

   @RemoteAction
    public static Account[] upsertAccts(Account[] accts)
    {
      upsert accts;

      for(Account a : accts)
      {
        a.Name = a.Name + ' - UPDATED';
      }
      return accts;
    }
}