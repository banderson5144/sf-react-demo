global class ResponsiveCtrl
{
   @RemoteAction
   global static typeAheadRes[] typeAheadFunc(String rName, String sObjName, Id[] selIds)
   {
      typeAheadRes[] resList = new typeAheadRes[] {};
      rName = rName.replaceAll('\'', '\\\\\'');

      sObject[] tempList = Database.query('Select Id,Name From '+
                                          sObjName +
                                          ' WHERE Name Like \'%' + rName + '%\''+
                                          ' AND Id NOT IN: selIds LIMIT 10');

      for(sObject s : tempList)
      {
         String realName = (String)s.get('Name');

         resList.add(new typeAheadRes((Id)s.get('Id'), realName));
      }
      return(resList);
   }

   @RemoteAction
   global static Account getSpecAcct(Id aId)
   {
     Account a = [Select Name,Description From Account WHERE Id =: aId];

     return a;
   }
  @RemoteAction
   global static Account[] getAccts()
   {
     return [Select Name From Account];
   }

   @RemoteAction
    global static Account[] upsertAccts(Account[] accts)
    {
      upsert accts;

      for(Account a : accts)
      {
        a.Name = a.Name + ' - UPDATED';
      }
      return accts;
    }

    @RemoteAction
     global static Account upsertSingleAcct(Account acct)
     {
       upsert acct;
       return acct;
     }

   global class typeAheadRes
   {
      global Id     rId;
      global String rName;

      global typeAheadRes(Id rId, String rName)
      {
         this.rId   = rId;
         this.rName = rName;
      }
   }
}
