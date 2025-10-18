import java.io.*;
import java.util.*;
public class duplicate
{
	
	static Scanner sc=new Scanner(System.in);
	void Welcome()
	{
		System.out.println("Welcome to the harmonica project!");
	}
	int choice()
	{
		System.out.println("Enter : ");
		System.out.println("1 for unique notes conversion : ");
		System.out.println("2 for standard Sargam format 1  to Tower Chromatica notes :  ");
		System.out.println("3 for inter-conversion between harmonicas");
		System.out.println("4 for western notation to Sargam format 1 :  ");
		System.out.println("5 for Sargam format 1 to western notation :  ");
		System.out.println("6 for standard Sargam format 1 to Chromatic Harmonica : ");
		
		int ch=sc.nextInt();
		return ch;
	}
	String C_diatonic_to_sargam(String holder) throws IOException
	{
		String int_notes[]= {"+1","-1","+2","-2","+3","-3","+4","-4","+5","-5","+6","-6","+7","-7","+8","-8","+9","-9","+10","-10"};
		String sargam[]= {"S.","R.","G.","P.","P.","N.","S","R","G","M","P","D","S'","N","G'","R'","P'","M'","S''","D'"};
        String int_notes_2[]= {"1","-1","2","-2","3","-3","4","-4","5","-5","6","-6","7","-7","8","-8","9","-9","10","-10"};
		
		int a1;
        int words=0;
        for(a1=0;a1<holder.length();a1++)
        {
            if(holder.charAt(a1)==' ' || a1==holder.length()-1)
            {
                words+=1;
            }
        }
        int ul=0,ll=0;
        int count = 1;
        String ans="";
        for(a1=0;a1<holder.length();a1++)
        {
            ul=a1;
            if(holder.charAt(a1)==' ' || a1==holder.length()-1)
            {
            	String he;
                if(a1==holder.length()-1)
                {
                    he=holder.substring(ll,ul+1);
                }
                else
                {
                    he=holder.substring(ll,ul);
                    }
             int l;
             
             int ct=0;
             inner:
             {
            	 for(l=0;l<int_notes.length;l++)
                 {
                	 if(he.equals(int_notes[l])||he.equals(int_notes_2[l]))
                	 {
                		 ans+=" "+sargam[l];
                		 count++;
                		 break inner;
                	 }
                 } 
             }
             ll=ul+1;
             
            }
	}
        return ans;
	}
	void unique_extraction_algo(String h[],String holder) throws IOException
	{
		BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
		int a1;
		System.out.println();
		System.out.println("Enter converter : ");
		String chld[]=new String[h.length];
		for(a1=0;a1<h.length;a1++)
		{
			System.out.print(h[a1]+" = ");
			chld[a1]=br.readLine();
		}
		System.out.println();
		

        int words=0;
        for(a1=0;a1<holder.length();a1++)
        {
            if(holder.charAt(a1)==' ' || a1==holder.length()-1)
            {
                words+=1;
            }
        }
        String wrd[]=new String[words];
        int count=0;
        int ul=0,ll=0;
        for(a1=0;a1<holder.length();a1++)
        {
            ul=a1;
            if(holder.charAt(a1)==' ' || a1==holder.length()-1)
            {
            	String he;
                if(a1==holder.length()-1)
                {
                    he=holder.substring(ll,ul+1);
                }
                else
                {
                    he=holder.substring(ll,ul);
                    }
             int l;
             inner:
             {
            	 for(l=0;l<h.length;l++)
                 {
                	 if(he.equals(h[l]))
                	 {
                		 System.out.print(chld[l]+" ");
                		 break inner;
                	 }
                 } 
             }
             ll=ul+1;
             
            }
       
        }
		
	}
	void standard_notation(String holder) throws IOException
	{
		/**
		String sargam[]= {"S","R","G","M","P","D","N","N.","D.","m"};
		String int_notes[]= {"+9","-10","+11","-12","+13","-14","-16","-8","-6","-12'"};
		**/

		String sargam[]= {"S.","R.","G.","M.","P.","D.","N.","S..","S","R","G","M","P","D","N","S-","S'","R'","G'","M'","P'","D'","N'","S''","r","g","m","d","n"};
		String int_notes[]= {"+1","-2","+3","-4","+5","-6","-8","+7","+9","-10","+11","-12","+13","-14","-16","+15","+17","-18","+19","-20","+21","-22","-24","+23","+9'","-10'","-12'","+13'","-14'"};
		
		
		int a1;
        int words=0;
        for(a1=0;a1<holder.length();a1++)
        {
            if(holder.charAt(a1)==' ' || a1==holder.length()-1)
            {
                words+=1;
            }
        }
        int ul=0,ll=0;
        int count = 1;
        for(a1=0;a1<holder.length();a1++)
        {
            ul=a1;
            if(holder.charAt(a1)==' ' || a1==holder.length()-1)
            {
            	String he;
                if(a1==holder.length()-1)
                {
                    he=holder.substring(ll,ul+1);
                }
                else
                {
                    he=holder.substring(ll,ul);
                    }
             int l;
             inner:
             {
            	 for(l=0;l<sargam.length;l++)
                 {
                	 if(he.equals(sargam[l]))
                	 {
                		 System.out.print(int_notes[l]+" ");
                		 if(count%6==0)
                		 {
                			 System.out.println();
                		 }
                		 count++;
                		 break inner;
                	 }
                 } 
             }
             ll=ul+1;
             
            }
	}
        choose();
}
    String[] dup(String s)
    {
        int words=0;
        int a1;
        for(a1=0;a1<s.length();a1++)
        {
            if(s.charAt(a1)==' ' || a1==s.length()-1)
            {
                words+=1;
            }
        }
        String wrd[]=new String[words];
        int count=0;
        int ul=0,ll=0;
        for(a1=0;a1<s.length();a1++)
        {
            ul=a1;
            if(s.charAt(a1)==' ' || a1==s.length()-1)
            {
            	String h;
                if(a1==s.length()-1)
                {
                    h=s.substring(ll,ul+1);
                }
                else
                {
                    h=s.substring(ll,ul);
                    }
                wrd[count]=h;
                count++;
                ll=ul+1;
            }
       
        }
        int a2;
        int count2=0;
        int nw=0;
        for(a1=0;a1<wrd.length;a1++)
        {
        	String h=wrd[a1];
        	count2=0;
        	for(a2=a1;a2<wrd.length;a2++)
        	{
        		if(h.equals(wrd[a2]))
        		{
        			count2++;
        		}
        	}
        	if(count2==1)
        	{
        		nw++;
        	}
        }
        int ini=0;
        String sr[]=new String[nw];
        for(a1=0;a1<wrd.length;a1++)
        {
        	String h=wrd[a1];
        	count2=0;
        	for(a2=a1;a2<wrd.length;a2++)
        	{
        		if(h.equals(wrd[a2]))
        		{
        			count2++;
        		}
        	}
        	if(count2==1)
        	{
        		sr[ini]=h;
        		ini++;
        	}
        }
        System.out.println("Unique Characters : ");
        for(a1=0;a1<sr.length;a1++)
        {
        	System.out.print(sr[a1]+" ");
        }
        return sr;
        
    }
    public static void main(String args[]) throws IOException
    {
    	choose();
    	
    }
    private void western_to_sargam(String s) throws IOException
    {
    
    	int a1,a2;
    	int len=s.length();
    	int words=0;
    	for(a1=0;a1<len;a1++)
    	{
    		if(s.charAt(a1)==' '|| a1==len-1)
    		{
    			words+=1;
    		}
    	}
    	int ll=0,ul=0;
    	String holder;
    	int count=0;
    	String arr[]=new String[words];
    	for(a1=0;a1<len;a1++)
    	{
    		ul=a1;
    		if(s.charAt(a1)==' '|| a1==len-1)
    		{
    			if(a1==len-1)
    			{
    				holder=s.substring(ll,ul+1);
    			}
    			else
    			{
    			holder=s.substring(ll,ul);
    			}
    			arr[count]=holder;
    			count++;
    			ll=a1+1;
    		}
    	}
    	
    	String western[]= {"C-L","C#-L","D-L","D#-L","E-L","F-L","F#-L","G-L","G#-L","A-L","A#-L","B-L","C-LL","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C-M","C-H","C#-H","D-H","D#-H","E-H","F-H","F#-H","G-H","G#-H","A-H","A#-H","B-H","C-HH"};
    	String sargam[]= {"S.","r.","R.","g.","G.","M.","m.","P.","d.","D.","n.","N.","S..","S","r..","R","g","G","M","m","P","d","D","n","N","S-","S'","r'","R'","g'","G'","M'","m'","P'","d","D'","n'","N'","S''"};
    	
    	int counter=1;
    	for(a1=0;a1<words;a1++)
    	{
    		String h=arr[a1];
    		counter++;
    		for(a2=0;a2<western.length;a2++)
    		{
    			
    			if(h.equals(western[a2]))
    			{
    				System.out.print(sargam[a2]+" ");
    			}
    		}
    		if(counter%10==0)
    		{
    			System.out.println();
    		}
    		}
    	choose();
    	}
    	
    private void sargam_to_western(String s) throws IOException
    {
    
    	int a1,a2;
    	int len=s.length();
    	int words=0;
    	for(a1=0;a1<len;a1++)
    	{
    		if(s.charAt(a1)==' '|| a1==len-1)
    		{
    			words+=1;
    		}
    	}
    	int ll=0,ul=0;
    	String holder;
    	int count=0;
    	String arr[]=new String[words];
    	for(a1=0;a1<len;a1++)
    	{
    		ul=a1;
    		if(s.charAt(a1)==' '|| a1==len-1)
    		{
    			if(a1==len-1)
    			{
    				holder=s.substring(ll,ul+1);
    			}
    			else
    			{
    			holder=s.substring(ll,ul);
    			}
    			arr[count]=holder;
    			count++;
    			ll=a1+1;
    		}
    	}
    	
    	String western[]= {"C-L","C#-L","D-L","D#-L","E-L","F-L","F#-L","G-L","G#-L","A-L","A#-L","B-L","C-LL","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C-M","C-H","C#-H","D-H","D#-H","E-H","F-H","F#-H","G-H","G#-H","A-H","A#-H","B-H","C-HH"};
    	String sargam[]= {"S.","r.","R.","g.","G.","M.","m.","P.","d.","D.","n.","N.","S..","S","r..","R","g","G","M","m","P","d","D","n","N","S-","S'","r'","R'","g'","G'","M'","m'","P'","d","D'","n'","N'","S''"};
    	
    	int counter=1;
    	for(a1=0;a1<words;a1++)
    	{
    		String h=arr[a1];
    		counter++;
    		for(a2=0;a2<western.length;a2++)
    		{
    			
    			if(h.equals(sargam[a2]))
    			{
    				System.out.print(western[a2]+" ");
    			}
    		}
    		if(counter%10==0)
    		{
    			System.out.println();
    		}
    		}
    	choose();
    	}
    	
    private void sargam_to_chromatic_harmonica(String s) throws IOException
    {
    
    	int a1,a2;
    	int len=s.length();
    	int words=0;
    	for(a1=0;a1<len;a1++)
    	{
    		if(s.charAt(a1)==' '|| a1==len-1)
    		{
    			words+=1;
    		}
    	}
    	int ll=0,ul=0;
    	String holder;
    	int count=0;
    	String arr[]=new String[words];
    	for(a1=0;a1<len;a1++)
    	{
    		ul=a1;
    		if(s.charAt(a1)==' '|| a1==len-1)
    		{
    			if(a1==len-1)
    			{
    				holder=s.substring(ll,ul+1);
    			}
    			else
    			{
    			holder=s.substring(ll,ul);
    			}
    			arr[count]=holder;
    			count++;
    			ll=a1+1;
    		}
    	}
    	
    	String wh[]=new String[words];
    	String western[]= {"C-L","C#-L","D-L","D#-L","E-L","F-L","F#-L","G-L","G#-L","A-L","A#-L","B-L","C-LL","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C-M","C-H","C#-H","D-H","D#-H","E-H","F-H","F#-H","G-H","G#-H","A-H","A#-H","B-H","C-HH"};
    	String sargam[]= {"S.","r.","R.","g.","G.","M.","m.","P.","d.","D.","n.","N.","S..","S","r..","R","g","G","M","m","P","d","D","n","N","S-","S'","r'","R'","g'","G'","M'","m'","P'","d'","D'","n'","N'","S''"};
    	
    	
    	int cn=0;
    	for(a1=0;a1<words;a1++)
    	{
    		String h=arr[a1];
    		
    		for(a2=0;a2<western.length;a2++)
    		{
    			
    			if(h.equals(sargam[a2]))
    			{
    				wh[cn]=western[a2];
    				cn++;
    			}
    		}
    	}
    	
    	String western2[]= {"C-L","C#-L","D-L","D#-L","E-L","F-L","F#-L","G-L","G#-L","A-L","A#-L","B-L","C-LL","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C-M","C-H","C#-H","D-H","D#-H","E-H","F-H","F#-H","G-H","G#-H","A-H","A#-H","B-H","C-HH"};
    	String holes[]= {"+1","+1*","-1","-1*","+2","-2","-2*","+3","+3*","-3","-3*","-4","+4","+5","+5*","-5","-5*","+6","-6","-6*","+7","+7*","-7","-7*","-8","+8","+9","+9*","-9","-9*","+10","-10","-10*","+11","+11*","-11","-11*","-12","+12"};
    	
    	
    	int counterz=1;
    	for(a1=0;a1<words;a1++)
    	{
    		String h=wh[a1];
    		counterz++;
    		for(a2=0;a2<western.length;a2++)
    		{
    			
    			if(h.equals(western2[a2]))
    			{
    				System.out.print(holes[a2]+" ");
    			}
    		}
    		if(counterz%10==0)
    		{
    			System.out.println();
    		}
    		}
    	
    	choose();
    
    }
    
    private static void choose() throws IOException
    {
    	System.out.println();
    	System.out.println();
    	duplicate obj=new duplicate();
    	BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
    	obj.Welcome();
    	int choose=obj.choice();
    	switch(choose)
    	{
    	case 1:
    	{
    		System.out.println("Enter Note String : ");
        	String s=br.readLine();
        	String h[]=obj.dup(s);
    		obj.unique_extraction_algo(h,s);
    		break;
    	}
    	case 2:
    	{
    		System.out.println("Enter Note String : ");
        	String s=br.readLine();
        	obj.standard_notation(s);
    		break;
    	}
    	case 3:
    	{
    		System.out.println("Enter according to following choices : ");
    		System.out.println("1 - C diatonic to tower chromatica  ");
    		int ent=sc.nextInt();
    		Contain:
    		{
    			switch(ent)
    			{
    			case 1:
    			{
    				System.out.println("Enter Note String : ");
    	        	String s=br.readLine();
    	        	String holder = obj.C_diatonic_to_sargam(s);
    	        	obj.standard_notation(holder);
    	        	
    	        	break;
    			}
    			default:
    			{
    				System.out.println("Wrong!");
    				System.exit(0);
    				break;
    			}
    			}
    		}
    		break;
    	}
    	case 4:
    	{
    		System.out.println("Enter Note String : ");
        	String s=br.readLine();
        	obj.western_to_sargam(s);
    	}
    	case 5:
    	{
    		System.out.println("Enter Note String : ");
        	String s=br.readLine();
        	obj.sargam_to_western(s);
    	}
    	case 6:
    	{
    		System.out.println("Enter Note String : ");
        	String s=br.readLine();
        	obj.sargam_to_chromatic_harmonica(s);
    	}
    	default:
    	{
    		System.exit(0);
    		break;
    	}
    }
    	
    }
}

