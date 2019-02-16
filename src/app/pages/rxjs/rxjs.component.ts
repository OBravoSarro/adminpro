import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
	selector: 'app-rxjs',
	templateUrl: './rxjs.component.html',
	styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

	private subscription:Subscription;

	constructor() {

		/* this.returnObservable().pipe(
			retry(2)
		)
		.subscribe(
			(countresult) =>  console.log('Count next', countresult),
			(error) => console.error('Error in obs', error),
			() => console.log('Obs finish')
		); */
		this.subscription = this.returnObservable()
		.subscribe(
			(countresult) =>  console.log('Count next', countresult),
			(error) => console.error('Error in obs', error),
			() => console.log('Obs finish')
		);

	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private returnObservable():Observable<any> {
		return new Observable( (observer:Subscriber<any>) => {
			let count = 0;
			const interval = setInterval(() => {
				count += 1;
				const dataSend = { value:count };
				observer.next(dataSend);
				if(count === 20){
					clearInterval(interval);
					observer.complete();
				}else if(count > 17){
					clearInterval(interval);
					observer.error('Count is too crazy');
				}
			}, 1000);
		}).pipe(
			map( (resp) => resp.value),
			filter((value, index) => {
				if((value%2 === 1)){
					//impar
					return true;
				}else{
					//par
					return false;
				}
			})
		);
	}

}
